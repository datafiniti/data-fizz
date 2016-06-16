var express = require('express');
var cheerio = require('cheerio'), $;
var fs = require('fs');
var bookScraper = require('./scrapeBook.js');
var books = [];

//If we were scraping outside webpages, an npm module called 'axios'
//could be used to fetch the webpage's html. It is a promise based http tool for node

//I made a function readBook, which is called recursively, because I am using 'fs' to read the html files
//and the fs.readFile function is asynchronous. An alternative would be using the synchronous version of 'fs.readFile'
//inside of a simple for loop or while loop. This would be less 'expensive', in terms of not building
//up the call stack, but would hold up the rest of the program
function readBook(bookNum){

  fs.readFile('./data/book' + bookNum + '.html', 'utf8', function(err, data){
    var isbn_shipping, bookDeets = {};

    if(err) throw err;

    $ = loadPage(data);

    bookDeets["title"] = bookScraper.getTitle($);
    bookDeets["author"] = bookScraper.getAuthor($);
    bookDeets["price"] = bookScraper.getPrice($);

    //needed a variable here because .getISBNandShipping returns an object with both details
    isbn_shipping = bookScraper.getISBNandShipping($);
    bookDeets["shipping_weight"] = isbn_shipping.shipping_weight;
    bookDeets["isbn-10"] = isbn_shipping.isbn;


    books.push(bookDeets);

    if(bookNum < 20){
      bookNum++;
      readBook(bookNum);
    }

  });
}

readBook(1);

function loadPage (webpage) {
  return cheerio.load(webpage);
}
