const cheerio = require('cheerio');

const scraper = result => {
  const $ = cheerio.load(result);
  const title = $("#btAsinTitle")
    .text()
    .trim();
  const author = $("#handleBuy .buying span a")
    .first()
    .text()
    .trim();
  const price = $("#actualPriceValue .priceLarge").text() + " USD";
  const shipRegex = /(<li><b>Shipping Weight:<\/b>).+/g;
  const shipping_weight = $("#productDetailsTable .content ul")
    .html()
    .trim()
    .match(shipRegex)[0]
    .split(" ")
    .slice(2, 4)
    .join(" ");
  const isbnRegex = /(<li><b>ISBN-10:<\/b>).\w+/g;
  const isbn10 = $("#productDetailsTable .content ul")
    .html()
    .trim()
    .match(isbnRegex)[0]
    .split(" ")
    .slice(1)
    .join("");
  const content = {
    title,
    author,
    price,
    shipping_weight,
    "isbn-10": isbn10
  };
  return content;
};

module.exports = scraper;
