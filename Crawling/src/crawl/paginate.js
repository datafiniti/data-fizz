const Nightmare = require('nightmare');

const nightmare = new Nightmare({ show: true }); // Set true to see electron window
const scrape = require('../scrape/scrape');
const dataConfig = require('../data/dataConfig');
const config = require('../config');
const exportData = require('../data/exportData');

// loops over array of urls (our books). Each iteration harnesses nightmare, navigates to each
// url in the array, grabs the html from that page and passes them to scrape
const paginate = (data) => {
  data.reduce((accumulator, url) => accumulator.then(() => nightmare.goto(url)
    .wait('body')
    .click('#bdSeeLessPrompt')
    .evaluate(() => document.getElementById('dp-container').innerHTML)
    .then((result) => {
      //pass to scrape
      scrape(result);
    })), Promise.resolve([])).then(() => {
      //adds sourceURL, scraped previously by getBookURL(), and an id to each record in bookData
    for (let i = 0; i < config.bookLimit; i += 1) {
      dataConfig.bookData[i].sourceURL = dataConfig.bookurls[i];
      dataConfig.bookData[i].id = i + 1;
    }
    //passes book data to the export function
    exportData(dataConfig.bookData);
  });
};

module.exports = paginate;
