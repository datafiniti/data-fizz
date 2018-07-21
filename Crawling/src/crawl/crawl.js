const Nightmare = require('nightmare')
const config = require('../config')
const getBookURL = require('../scrape/getBookURL')

const nightmare = new Nightmare({ show: true }) // Set true to see electron window

// Creates a nightmare instance, opens desired url, navigates to desired destination, grabs html
// and passes it to getBookURL
const crawl = () => {
  nightmare
    .goto(config.url)
    .mouseover('#nav-link-shopall')
    .mouseover('span.nav-hasPanel:nth-child(9) > span:nth-child(1)')
    .click('div.nav-template:nth-child(8) > div:nth-child(4) > a:nth-child(1) > span:nth-child(1)')
    .click('div.left_nav:nth-child(2) > ul:nth-child(5) > li:nth-child(1) > a:nth-child(1)')
    .click('ul.a-unordered-list:nth-child(7) > div:nth-child(1) > li:nth-child(1) > span:nth-child(1) > a:nth-child(1) > span:nth-child(1)')
    // returns html for use with cheerio
    .evaluate(() => document.getElementById('atfResults').innerHTML)
    .end()
    .then((html) => {
      // pass html to getBookURL function
      getBookURL(html)
    })
    .catch((error) => {
      console.error('Search failed:', error)
    })
}


module.exports = crawl
