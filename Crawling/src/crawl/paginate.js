const Nightmare = require('nightmare');

const nightmare = new Nightmare({ show: false }); // Set true to see electron window
const scrape = require('../scrape/scrape');
const dataConfig = require('../data/dataConfig');
const config = require('../config');
const exportData = require('../data/exportData');

// loops over array of urls (our books). Each iteration harnesses nightmare, following the url to
// the book page
const paginate = (data) => {
  data.reduce((accumulator, url) => accumulator.then(() => nightmare.goto(url)
    .wait('body')
    .click('#bdSeeLessPrompt')
    .evaluate(() => document.getElementById('dp-container').innerHTML)
    .then((result) => {
      scrape(result);
    })), Promise.resolve([])).then(() => {
    for (let i = 0; i < config.bookLimit; i += 1) {
      dataConfig.bookData[i].sourceURL = dataConfig.bookurls[i];
      dataConfig.bookData[i].id = i + 1;
    }
    exportData(dataConfig.bookData);
  });
};

module.exports = paginate;
