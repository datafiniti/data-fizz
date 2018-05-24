var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("http://www.buzzfeed.com", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('div.col1 > ul > li.grid-posts__item').each(function( index ) {
    var title = $(this).find('h2 > a').text().trim();
    var author = $(this).find('div.small-meta > div:nth-child(1) > a').text().trim();
    var responses = $(this).find('div.small-meta > div:nth-child(3) > a').text();
    console.log(title);
    console.log(author);
    console.log(responses);
    fs.appendFileSync('buzzfeed.txt', title + '\n' + author + '\n' + responses + '\n');
  });

});