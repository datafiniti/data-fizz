//To run: node --harmony index.js
//Ouputs a file beginning with 'shipment', followed by Date.now().
//Parses every file in the ./data directory.

'use strict';

const fs = require('fs');
const readline = require('readline');

const Box      = require('./Box.js');
const Book     = require('./Book.js');
const Regex    = require('./amzn_regex.js').books;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Save as: ', function(fileName){
  writeShipment(fileName);
  rl.close();
});

//Takes an array of books, returns an array of 10lb. arrays of books
const groupByWeight = function(order, boxCapacity){

  let books = order.slice(); //Create a copy to avoid mutation

  books.sort(function(a, b){
    return b.weigh() - a.weigh();
  });

  let Boxes = {};

  let nextId = 0; 
  while (books.length > 0){
    let lightest = books[books.length-1].weigh();
    let nextBox = new Box([books[0]], boxCapacity);
    books.shift();
    nextBox.id = nextId;
    nextId++;
    while (nextBox.roomLeft().toPrecision(2) > lightest && books.length > 1){
      let j;
      for (j = books.length-1; j >= 0; j--){
        if (books[j].weigh() > nextBox.roomLeft()){
          nextBox.load(books[j+1]);
          books.splice(j+1, 1);
          lightest = books[books.length-1].weigh();
          j = -2;//terminate the for loop early
        }

        else if (j === 0 && books[books.length-1].weigh() < nextBox.roomLeft()){
          nextBox.load(books[0]);
          books.splice(0, 1);
          lightest = books[books.length-1].weigh();
        }
      }
      if (j === -1){ //If the for loop did not terminate early
        nextBox.load(books[books.length-1]);
        books.splice(books.length-1, 1);
        lightest = books[books.length-1].weigh();
      }
    }
    if (books.length === 1 && (books[0].weigh() < nextBox.roomLeft())){
      nextBox.load(books[0]);
      books.splice(0, 1);
      lightest = null;
    }
    Boxes["Box "+ (nextBox.id + 1)] = nextBox;
  }

  return Boxes;

}

const writeShipment = function (name) {
  const fileName = name || 'shipment' + Date.now() + '.json';
  fs.readdir('./data', function(err, files){
    const promisedBooks = files.map(function(filename){
      return Book.parse('./data/' + filename, Regex);
    });

    Promise.all(promisedBooks).then(function(books){
      const weightGroups = groupByWeight(books, 10);
      const JSONText = JSON.stringify(weightGroups, null, 1);
      fs.writeFile(fileName, JSONText, 'utf8', function(err){
        if (err) throw err;
        console.log(fileName, "written to current directory.");
      });
    });
  });
}
