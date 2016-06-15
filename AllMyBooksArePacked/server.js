var express = require('express');
var cheerio = require('cheerio'), $;
var fs = require('fs');
var books = {};

//If we were scraping outside webpages, an npm module called 'axios'
//could be used to fetch the webpage. It is a promise based http
//tool for node

fs.readFile('./data/book1.html', 'utf8', function(err, data){
  if(err) throw err;

  $ = cheerio.load(data);
  var title = $('#btAsinTitle').text();
  console.log('this title', title);

});
