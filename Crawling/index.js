const fs = require('fs')
const cheerio = require('cheerio')
const Nightmare = require('nightmare')
const nightmare = new Nightmare({ show: false }) //Set true to see electron window

const config = {
  url: 'https://www.amazon.com',
  bookLimit: 10
}

const urls = []
const bookData = []


//Creates a nightmare instance and navigates the website to the desired location
const crawlAmazon = () => {
  nightmare //.viewport(1920, 1080)
    .goto(config.url)
    .mouseover('#nav-link-shopall')
    .mouseover('span.nav-hasPanel:nth-child(9) > span:nth-child(1)')
    .click('div.nav-template:nth-child(8) > div:nth-child(4) > a:nth-child(1) > span:nth-child(1)')
    .click('div.left_nav:nth-child(2) > ul:nth-child(5) > li:nth-child(1) > a:nth-child(1)')
    .click('ul.a-unordered-list:nth-child(7) > div:nth-child(1) > li:nth-child(1) > span:nth-child(1) > a:nth-child(1) > span:nth-child(1)')
    //returns html for use with cheerio
    .evaluate(() => {
      return document.getElementById('atfResults').innerHTML
    })
    .then((html) => {
      getBookURL(html)
    })
    .catch(error => {
      console.error('Search failed:', error)
    })
}

//loads html data from crawlAmazon and pulls hrefs for the number of books we want
const getBookURL = (data) => {
  let $ = cheerio.load(data)

  $("h2.s-inline").each(function (i, element) {
    if (i < config.bookLimit) {
      let url = $(element).parent().attr("href")
      urls.push(url)
    }
  })
  paginateAmazon(urls)
}

//loops over each href,  and returns html for cheerio to scrape
const paginateAmazon = (data) => {
  data.reduce((accumulator, url) => {
    return accumulator.then(() => {
      return nightmare.goto(url)
        .wait('body')
        .click('#bdSeeLessPrompt')
        .evaluate(() => {
          return document.getElementById('dp-container').innerHTML
        })
        .then(function (result) {
          scrapeAmazon(result)
        })
    })
  }, Promise.resolve([])).then(function (results) {

    for (let i = 0; i < urls.length; i++) {
      bookData[i].sourceURL = urls[i]
      bookData[i].id = i + 1
    }
    bookData.toString('utf8')
    fs.writeFile("./amazonBookData.json", JSON.stringify(bookData, null, 4), (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log("File has been created")

    })
    console.log('Shutting down nightmare')
    return nightmare.end()
  })
}

scrapeAmazon = (data) => {
  const $ = cheerio.load(data)

  $.fn.ignore = function(sel){
    return this.clone().find(sel||">*").remove().end();
  };

  const name = $("#productTitle").text().trim()
  const listPrice = parseFloat(($("span.a-color-base:nth-child(3)>span:nth-child(1)").text().trim()).substring(1))
  const description = $("#bookDescription_feature_div").ignore("div").text().replace(/\n|\t|<[^>]*>/g, '').trim()
  const dimensions = sanitize($("td.bucket>div:nth-child(2)>ul:nth-child(1)>li:nth-child(6)").text().replace(/\n/g, '')).trim()
  const weight = sanitize($("td.bucket>div:nth-child(2)>ul:nth-child(1)>li:nth-child(7)").text()).trim()
  const scrapedData = (
    {
      name: name,
      listPrice: listPrice,
      description: description,
      dimensions: dimensions,
      weight: weight
    })
  bookData.push(scrapedData)
}

const sanitize = (str) => {
  return str.split(':')[1]
}


crawlAmazon()
