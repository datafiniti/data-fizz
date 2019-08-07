const Apify = require("apify");

const getInnerText = async (page, selector) =>
  page.$eval(selector, el => el.textContent);
const numberify = string => Number(string.replace(/[^\d.]+/, "") || 0);

Apify.main(async () => {
  const input = await Apify.getValue("INPUT");

  if (!input || !input.keyword)
    throw new Error("INPUT must contain a keyword!");

  console.log("Lauching Puppeteer...");
  const browser = await Apify.launchPuppeteer({
    headless: true
  });

  console.log(`Searching for keyword ${input.keyword}...`);
  const searchResultsPage = await browser.newPage();
  await searchResultsPage.goto(`https://www.amazon.com/${input.keyword}`);

  // This is the crawler queue that is populated with URLs to fetch
  const requestQueue = await Apify.openRequestQueue();

  // Define the URL pattern I want to follow from the search result page.
  const pseudoUrls = [
    new Apify.PseudoUrl("https://www.amazon.com/gp/product/[.*]")
  ];

  // Extract and enqueue URLs to crawl from the page.
  await Apify.utils.enqueueLinks({
    // page from which to extract URLs
    page: searchResultsPage,
    selector: "div.a-carousel-row-inner a.a-link-normal",
    pseudoUrls,
    requestQueue
  });

  const crawler = new Apify.PuppeteerCrawler({
    launchPuppeteerFunction: () => browser,

    handlePageFunction: async ({ request, page: productDetailsPage }) => {
      const title = await productDetailsPage.title();

      const price = await getInnerText(
        productDetailsPage,
        ".a-color-base.a-align-bottom.a-text-strike, .a-size-base.a-color-secondary"
      );

      const img = await productDetailsPage.evaluate(
        () =>
          document.querySelector(
            "img#main-image, img#ebooksImgBlkFront, img#imgBlkFront"
          ).src
      );

      let iFrame;
      // function to access the iframe
      for (const frame of productDetailsPage.mainFrame().childFrames()) {
        if (frame.name().includes("bookDesc_iframe")) {
          console.log("found the iframe");
          iFrame = frame;
        }
      }

      const discription = await iFrame.$$eval("p, div", element =>
        element.map(el => el.textContent)
      );

      const details = await productDetailsPage.evaluate(
        () => document.querySelector("div.content").innerText
      );

      let detailsArr = details.split(" ");
      let detailIdx = detailsArr.indexOf("Weight:");
      let weight;
      if (detailIdx !== -1) {
        weight = detailsArr.filter((el, id) => id === detailIdx + 1);
        weight.push(detailsArr[detailIdx + 2]);
        weight.unshift(detailsArr[detailIdx]);
        weight.join(" ");
      } else {
        weight = null;
      }

      // Save data in storage
      await Apify.pushData({
        products: {
          name: title,
          url: request.url,
          listPrice: numberify(price),
          discription: discription.join(),
          img,
          weight: weight
        }
      });
    },

    requestQueue,
    maxRequestsPerCrawl: 5,
    maxConcurrency: 5
  });

  await crawler.run();
  await browser.close();
});
