var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var url = "https://www.amazon.com/dp/1501180983"

request(url, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load('<span id="productTitle">...</span>');
  // const $ = cheerio.load();
  console.log($().text())


  $('div#siteTable > div.link').each(function( index ) {

    // var title = $(this).find('p.title > a.title').text().trim();
    // var score = $(this).find('div.score.unvoted').text().trim();
    // var user = $(this).find('a.author').text().trim();
    // console.log("Score: " + score);
    // console.log("User: " + user);
    // fs.appendFileSync('amazon.txt', title + '\n' + score + '\n' + user + '\n');
  });

});