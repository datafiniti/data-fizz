const express = require('express');
const cheerio = require('cheerio');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
var fs = require('fs');
const app = express();
;
const url = 'https://www.amazon.com/'

//using nightmare to go to desired book page listing
nightmare
    .goto(url)
    .click('#nav-link-shopall')
    .click('#a-page > div.a-container.fsdContainer.fsdFullWidthImage > div > div:nth-child(3) > div:nth-child(3) > div > a:nth-child(1)')
    .type('#twotabsearchtextbox', 'javascript for dummies')
    .click('#nav-search > form > div.nav-right > div > input')

    .evaluate(() => document.querySelector('body').outerHTML)
    .then(function (html) {
        const $ = cheerio.load(html);;
        // do something
        //select ul containing products, then have function click on each product based on 'id result' and gather info from each page
        //have to figure out how to open each page. perhaps start function at search page.
        //also try replacing type() with insert() for faster results

        let name, price, description, dimensions, imageURL, weight;
        let json = { name : "", price : "", description : "", dimensions : "", imageURL : "", weight : ""};

        $('#result_0 > div > div > div > div.a-fixed-left-grid-col.a-col-right > div.a-row.a-spacing-small > div:nth-child(1) > a > h2').filter(function(){
        let data = $(this);
        name = data.text();

        json.name = name;

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

        console.log('File successfully written! - Check your project directory for the output.json file');

      })
      })
    })

    // .catch(function (error) {
    // console.error('Error:', error);
    // });

app.listen(3000, (err) => {
  if (err) throw err;
  console.log('Magic happens on port 3000');
});
