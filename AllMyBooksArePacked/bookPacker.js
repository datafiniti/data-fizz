/* Node Modules */
var fs = require('fs');

/* Additional Modules */
var helpers = require('./helpers');
var cheerio = require('cheerio');

var bookPacker = {
  /* Asynchronously reads the file names in the directory */
  getFileNames: function(path) {
    var promise = new Promise( (resolve, reject) => {
      fs.readdir(__dirname + '/'+ path, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });

    return promise;
  },

  /* Asynchronously reads the content of a file (in this case HTML) */
  readHtml: function(path, fileName) {
    var promise = new Promise( (resolve, reject) => {
      fs.readFile(__dirname + '/' + path + '/' + fileName, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    return promise;
  },

  /* Model the DOM and extract the required data out */
  getData: function(html) {
    var title, author, price, weight, isbn;
    var $ = cheerio.load(html);

    title = helpers.getTitle($);
    author = helpers.getAuthor($);
    price = helpers.getPrice($);
    weight = helpers.getWeight($);
    isbn = helpers.getISBN($);

    var book = {
      title: title,
      author: author,
      price: price,
      shipping_weight: weight,
      'isbn-10': isbn
    }

    return book;
  },

  /* Sorts into boxes in O(n) time, at the cost of space */
  sortBoxes: function(books) {
    var result = {};
    var id = 1;

    books.forEach( (book) => {
      var currentBox = result['box'+ id];

      if (currentBox === undefined) {
        result['box' + id] = new Box(id, book.shipping_weight, book);
        currentBox = result['box'+ id];
        return;
      }


      var bookWeight = Number(book.shipping_weight.split(' ')[0]);
      var boxWeight = Number(currentBox.totalWeight.split(' ')[0]);

      if (bookWeight + boxWeight <= 10) {
        currentBox.contents.push(book);
        currentBox.totalWeight = (boxWeight + bookWeight).toFixed(1) + ' pounds';
      } else {
        id++;
        result['box' + id] = new Box(id, book.shipping_weight, book);      
      }
    });
    
    return result;
  },

  /* Generates an array of promises to read all files */
  generateHtmlPromises: function(files) {
    var data = files.map( (fileName) => {
      return bookPacker.readHtml('data', fileName);
    });

    return Promise.all(data);
  },

  /* Sorts our boxes and saves it as a JSON file */
  generateResultsJson: function(vals) {
    var books = vals.map( (html) => { return bookPacker.getData(html) });
    var boxes = bookPacker.sortBoxes(books);
    var results = JSON.stringify(boxes, null, 2);

    var promise = new Promise( (resolve, reject) => {
      fs.writeFile('results.json', results, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    return promise;
  }
};

/* Box class */
function Box(id, initWeight, initItem) {
  this.id = id;
  this.totalWeight = initWeight + ' pounds';
  this.contents = [initItem];
}

/* Export the bookPacker */
module.exports = bookPacker;
