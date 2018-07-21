const Nightmare = require('nightmare')
const chai = require('chai')
const expect = require('chai').expect
const config = require('../src/config')
const dataConfig = require('../src/data/dataConfig')
const paginate = require('../src/crawl/paginate')

describe('is nightmare navigating correctly?', function () {
  this.timeout('30s')

  let nightmare = null
  beforeEach(() => {
    nightmare = new Nightmare({ show: true })
  })

  describe('nightmare opens starting url', () => {
    it('should load without error', done => {
      nightmare
        .goto(config.url)
        .end()
        .then(result => { done() })
        .catch(done)
    })
  })

  describe('The crawler function', () => {
    it('should navigate to the desired endpoint and return html', done => {
      nightmare
        .goto(config.url)
        .mouseover('#nav-link-shopall')
        .mouseover('span.nav-hasPanel:nth-child(9) > span:nth-child(1)')
        .click('div.nav-template:nth-child(8) > div:nth-child(4) > a:nth-child(1) > span:nth-child(1)')
        .click('div.left_nav:nth-child(2) > ul:nth-child(5) > li:nth-child(1) > a:nth-child(1)')
        .click('ul.a-unordered-list:nth-child(7) > div:nth-child(1) > li:nth-child(1) > span:nth-child(1) > a:nth-child(1) > span:nth-child(1)')
        .evaluate(() => document.getElementById('atfResults').innerHTML)
        .end()
        .then(result => { expect(result).to.be.a('string'), done() })
        .catch(done)
    })
  })
  describe('The Paginate function', () => {
    it('should navigate to each url in the list, scrape the html, and pass it to scrape()', done => {

    })
  })
})


