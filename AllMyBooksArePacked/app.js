'use strict';

const fs = require('fs');

const Shipment = require('./Shipment.js');
const Box      = require('./Box.js');
const Book     = require('./Book.js');
const Regex    = require('./amzn_regex.js').books;

//Takes an array of books, returns an array of 10lb. arrays of books
const groupByWeight = function(inBooks){

  let books = inBooks.slice(); //Create a copy to avoid mutation

  books.sort(function(a, b){
    return parseFloat(b.weight) - parseFloat(a.weight);
  });

  let Boxes = [];

  let i = 0; //used to id Boxes
  while (books.length > 0){
    let lightest = parseFloat(books[books.length-1].weight);
    let nextBox = new Box([books[0]]);
    books.shift();
    nextBox.id = i;
    i++;
    let leftoverWeight = 10 - parseFloat(nextBox.totalWeight)
    let roomLeft = function(){
      return (leftoverWeight > lightest) && books.length > 1
    };
    while (roomLeft()){
      let j;
      for (j = books.length-1; j >= 0; j--){
        if ((parseFloat(books[j].weight) > leftoverWeight)){
          nextBox.load(books[j+1]);
          books.splice(j+1, 1);
          leftoverWeight = (10 - nextBox.weigh()).toPrecision(2);
          lightest = books[books.length-1].weigh();
          j = -2;//terminate the for loop early
        }

        else if (j === 0 && parseFloat(books[books.length-1].weight) < leftoverWeight){
          nextBox.load(books[0]);
          books.splice(0, 1);
          leftoverWeight = (10 - nextBox.weigh()).toPrecision(2);
          lightest = parseFloat(books[books.length-1].weight);
        }
        else {
        }
      }
      if (j === -1){ //If the for loop did not terminate early
        console.log('j is -1')
        nextBox.load(books[books.length-1]);
        books.splice(books.length-1, 1);
        leftoverWeight = (10 - parseFloat(nextBox.totalWeight)).toPrecision(2);
        lightest = parseFloat(books[books.length-1].weight);
      }
    }
    if (books.length === 1 && (books[0].weigh() < 10 - nextBox.weigh())){
      nextBox.load(books[0]);
      books.splice(0, 1);
      leftoverWeight = (10 - nextBox.weigh());
      lightest = null;
    }
    Boxes.push(nextBox);
  }

  return Boxes;

}

fs.readdir('./data', function(err, files){
  const promisedBooks = files.map(function(filename){
    return Book.parse('./data/' + filename, Regex);
  });

  Promise.all(promisedBooks).then(function(books){
    const weightGroups = groupByWeight(books);
    const shipment = new Shipment(weightGroups);
    console.log(shipment);
  })
})

//x Get Array of Books
//x Sort by weight
//Find heaviest book

//Find heaviest sum of books that will fit with it
//  Calculate Tens Complement
//  Try to find individual

//put book(s) in box and remove from list


