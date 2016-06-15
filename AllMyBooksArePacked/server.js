var express = require('express');
var cheerio = require('cheerio'), $;
var fs = require('fs');
var books = [];
var title, author, price, numPrices, shipping_weight, isbn;
var test = [];

//If we were scraping outside webpages, an npm module called 'axios'
//could be used to fetch the webpage. It is a promise based http
//tool for node

fs.readFile('./data/book9.html', 'utf8', function(err, data){
  if(err) throw err;

  $ = cheerio.load(data);
  title = $('#btAsinTitle').text();
  console.log('this title', title);

  author = $('span','.buying').find('a').text();
  //had to take off the last seven characters below because in some cases
  //my selection was returning, for example: 'Reza AslanDetails'
  //with Reza Aslan being the author of course and the 'Details' coming from who knows where
  if(author.includes('Details')){
    author = author.substr(0, author.length - 7);
  }
  console.log('author', author);

  numPrices = $('.bb_price').length;
  //there is a case, for book #9, where there are several prices, such as price for rent,
  //so need to account for that
  if(numPrices > 1){
    price = $('.bb_price').slice(2, 3).text();
  } else {
    price = $('.bb_price').text();
  }

  price = price.replace(/\s/g, ''); //selection came with a lot of whitespace so need to remove that
  price = price + ' USD';
  console.log('dis price', price);

  isbn = $('table', '#detail-bullets').find('li').slice(3, 4).text();
  isbn = isbn.substr(-10); //above selection returns 'ISBN-10: 140006922X' so we want to grab just the last 10 characters
  isbn = Number(isbn);
  console.log('isbn', isbn);

  shipping_weight = $('table', '#detail-bullets').find('li').slice(6, 7).text();
  shipping_weight = shipping_weight.substr(17, 10); //original string 'Shipping Weight: 1.2 pounds (View shipping rates and policies)'
  //All weights from the sample are under 10 pounds and are measured to the tenth place. If we had to account for
  //heavier books, it would take just a bit more of logic
  console.log('shipping', shipping_weight);

  books.push({'title': title, 'author': author, 'price': price, 'shipping_weight': shipping_weight, 'isbn-10': isbn});
});

console.log('these are the books', books);
