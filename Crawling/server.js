const express = require('express');
const cheerio = require('cheerio');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
var fs = require('fs');
const app = express();

const url = 'https://www.amazon.com/';
let urls = [];
//using nightmare to go to desired book page listing
nightmare
  .goto(url)
  .click('#nav-link-shopall')
  .click('#a-page > div.a-container.fsdContainer.fsdFullWidthImage > div > div:nth-child(3) > div:nth-child(3) > div > a:nth-child(1)')
  .insert('#twotabsearchtextbox', 'batman')
  .click('#nav-search > form > div.nav-right > div > input')
  .wait(2000)
  .click('#leftNavContainer > ul:nth-child(27) > div > li:nth-child(1) > span > a')
  .wait(2000)

  .evaluate(() => document.querySelector('body').outerHTML)
    .then(function (html) {
      const $ = cheerio.load(html);

      $('#atfResults > ul > li > div > div > div> div > div > div > a.s-access-detail-page').each(function(){
          var link=$(this).attr('href')
          urls.push(link);
        })
        urls.length=9;
        urls.reduce(function(accumulator, url) {
          return accumulator.then(function(results) {
            return nightmare.goto(url)
              .wait(2500)
              .title()
              .then(function(result){
                results.push(result);
                return results;
                      });
                nightmare.catch(error => { return someFunction(nightmare); })
                  });
            }, Promise.resolve([])).then(function(results){
                console.dir(results);
            });

            })




    //
    //
    //   $('#s-results-list-atf li')

    //   fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    //
    //   console.log('File successfully written! - Check your project directory for the output.json file');
    //



  // .catch(function (error) {
  // console.error('Error:', error);
  // });
  // }


app.listen(3000, (err) => {
  if (err) throw err;
  console.log('Magic happens on port 3000');
});

//select ul containing products
//maybe use .map() or .each() to select 1st ten selectors then
//write function under selector that uses nightmare to click on each product based on 'id result'
//in the function once navigated to page, collect data using selectors then assign to json variable

//also try replacing type() with insert() for faster results
