const Apify = require("apify");

const getInnerText = async (page, selector) =>
  page.$eval(selector, el => el.textContent);
const numberify = string => Number(string.replace(/[^\d.]+/, "") || 0);

Apify.main(async () => {
  const input = await Apify.getValue("INPUT");

  // Object from `./apify_storage/key_value_stores/default/INPUT.json`
  if (!input || !input.keyword)
    throw new Error("INPUT must contain a keyword!");

  console.log("Lauching Puppeteer...");
  const browser = await Apify.launchPuppeteer({
    // makes the browser "headless", meaning that no visible browser window will open
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

    // selector under which to look for URLs
    selector: "div.a-carousel-row-inner a.a-link-normal",

    // pseudo URL object describing what URL format to look for
    pseudoUrls,

    //which queue to add the extracted URLs to
    requestQueue
  });

  const crawler = new Apify.PuppeteerCrawler({
    // this will reuse the browser instance,
    // a new instace would open up and we'd have 2 browsers running.
    launchPuppeteerFunction: () => browser,

    // This function will be called on every successful product details page fetch:
    // productDetailsPage is the following Puppeteer object:
    // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pageselector
    handlePageFunction: async ({ request, page: productDetailsPage }) => {
      const title = await productDetailsPage.title();

      // Save data in storage
      await Apify.pushData({
        products: {
          name: title,
          url: request.url
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
