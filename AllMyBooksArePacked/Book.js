'use strict';
const fs      = require('fs');
const bookReg = require('./amzn_regex').books;
/*
 * Minimum Data Per Book:
 * Title
 * Author
 * Price
 * Shipping Weight
 * ISBN-10
 */


class Book{
  constructor(page){
    this.scrape('title',  page, bookReg.title);
    this.scrape('author', page, bookReg.author);
    this.scrape('price',  page, bookReg.price);
    this.scrape('weight', page, bookReg.weight);
    this.scrape('ISBN10', page, bookReg.ISBN10);
  }

  scrape(property, file, regex){
    const book = this;
    fs.readFile(file, 'utf8', function(err, data){
      const result = data.match(regex) ? data.match(regex)[1] || data.match(regex)[2] : "None";
      book[property] = result;
      console.log(book);
    });
  }
}
