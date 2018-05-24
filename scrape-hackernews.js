var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("https://news.ycombinator.com/news", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('tr.athing:has(td.votelinks)').each(function( index ) {
    var title = $(this).find('td.title > a').text().trim();
    var link = $(this).find('td.title > a').attr('href');
    fs.appendFileSync('hackernews.txt', title + '\n' + link + '\n');
  });

});