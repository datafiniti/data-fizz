'use strict';
const fs = require('fs');

module.exports = class Book{

  constructor(title, author, price, weight, ISBN10){

    this.title  = title;
    this.author = author;
    this.price  = "$" + Number(price).toFixed(2) + " USD";
    this.weight = weight;
    this.ISBN10 = ISBN10;

  }

  weigh() {
    return parseFloat(this.weight);
  }

  static parse(file, regexObj){
    const promisedParams = Object.keys(regexObj).map(function(regexKey){
      const regex = regexObj[regexKey];
      return new Promise(function(resolve, reject){
        fs.readFile(file, 'utf8', function(err, data){
          const result = data.match(regex) ? data.match(regex)[1] || data.match(regex)[2] : "None";
          resolve(result);
        });
      });
    });

    return Promise.all(promisedParams).then(function(params){
      return new Book(...params);
    });
  }

}
