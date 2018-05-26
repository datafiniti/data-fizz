// For scraping using JQuery like commands
const cheerio = require('cheerio');
// For reading the saved html files
const fs = require('fs');

// Loop through the books
for(i = 1; i <= 20; i++) {
  console.log(i);
  scrape(i);
}

function scrape(i) {
    
    const $ = cheerio.load(fs.readFileSync('./data/book' + i + '.html'));
    
    let contents = [];
   
    let title = $('#btAsinTitle').text();

    let author = $('.parseasinTitle').next('span').text().slice(4, -20)

    let price = $('.priceLarge').text();
    
    // Filter through list items and stop when "Shipping" is found with indexOf
    let weight = $('#productDetailsTable').find('li').filter(function() {
        return $(this).text().indexOf("Shipping") > -1

    }).text().match(/[\d\.]+/) + " pounds"

    let isbn10 = $('#productDetailsTable').find('li').filter(function(i, elem) {
        return $(this).text().indexOf("ISBN-10") > -1
    }).text().slice(9)

    contents.push({
      "title": title,
      "author": author,
      "price": price,
      "shipping_weight": weight,
      "isbn-10": isbn10
    });
    
    console.log(contents);
  };