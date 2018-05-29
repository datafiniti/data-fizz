const cheerio = require('cheerio');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');


//starting url
const url = 'https://www.amazon.com/';
//empty array to save urls
let urls = [];

//using nightmare to go to desired book page listing
nightmare
  .goto(url)
  .click('#nav-link-shopall')
  .click('#a-page > div.a-container.fsdContainer.fsdFullWidthImage > div > div:nth-child(3) > div:nth-child(3) > div > a:nth-child(1)')
  .insert('#twotabsearchtextbox', 'batman')
  .click('#nav-search > form > div.nav-right > div > input')
  .wait(2500)
  .click('#leftNavContainer > ul:nth-child(27) > div > li:nth-child(1) > span > a')
  .wait(2500)

//evaluate listing page with cheerio
  .evaluate(() => document.querySelector('body').outerHTML)
    .then((html) => {
      let $ = cheerio.load(html);

// pull all href links from products on search page, and push to urls array
      $('#atfResults > ul > li > div > div > div> div > div > div > a.s-access-detail-page').each(function(){
        let link=$(this).attr('href')
        urls.push(link);
        })
        urls.length=10;

//run for each url in array to scrape data
        urls.reduce((accumulator, url) => {
          return accumulator.then((results) => {

            return nightmare.goto(url)
              .wait('body')
              .evaluate(() => {

//grabbing elements with querySelector and saving to variables
              let name = document.querySelector('#productTitle').innerText;

              let img = document.querySelector('#imgBlkFront').src;

              let description = document.querySelectorAll('noscript')[1].innerText;
              let exclude = /[^<>&.*?;()/]\/|<div>|<i>|<em>|<b>|<br>|&mdash;|/g;
              description = description.replace(exclude, '');

              let priceContainer = document.querySelector("#buyNewSection");
              let price = priceContainer.querySelector("div.inlineBlock-display > span.a-text-normal").innerText;

              let weight = document.querySelector("#productDetailsTable > tbody > tr > td > div > ul > li:nth-child(8)").innerText.substring(17, 29).replace('(', "");

              let dimension =  document.querySelector("#productDetailsTable > tbody > tr > td > div > ul > li:nth-child(7)").innerText.substring(20);

//return all variables into object
              return {
                "name": name,
                "description": description,
                "imageUrl": img,
                "price": price,
                "dimension": dimension,
                "weight": weight
                }
              })
              .then((result) => {
                results.push(result);
                return results;
              });
          })
//push all objects into promise.resolve
        }, Promise.resolve([])).then((results) => {
            results = { "product" : results }
              //write into json file
            fs.writeFile('output.json', JSON.stringify(results, null, 4),(err) =>{
              console.log('File successfully written! - Check your project directory for the output.json file');
            })
            //end nightmarejs
            nightmare.then(() => nightmare.end())
            })
      })
