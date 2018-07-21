const cheerio = require('cheerio');
const dataConfig = require('../data/dataConfig');
const paginate = require('../crawl/paginate');
const config = require('../config');

// receives html data from crawl(), scrapes 10 URLS, and passes URLS to paginate()
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
