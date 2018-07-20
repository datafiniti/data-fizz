const cheerio = require('cheerio');
const dataConfig = require('../data/dataConfig');
const paginate = require('../crawl/paginate');
const config = require('../config');

// receives html data from crawlAmazon and scrapes urls for 10 books and places them into an array
const getBookURL = (data) => {
  const $ = cheerio.load(data);

  $('h2.s-inline').each((i, element) => {
    if (i < config.bookLimit) {
      const url = $(element).parent().attr('href');
      dataConfig.bookurls.push(url);
    }
  });
  // send hrefs to paginate
  paginate(dataConfig.bookurls);
};

module.exports = getBookURL;
