'use strict';

const bookSortDesc = require('./Utils').bookSortDesc;
const Box = require('./Box').Box;

class BookBoxPacker {
  constructor(boxWeight) {
    this.boxWeight = boxWeight;
    this.id = 1;
  }
  generateId() {
    return this.id++;
  }
  packBooks(books) {
    const boxes = [];
    let sortedBooks = books.sort(bookSortDesc);

    while (sortedBooks.length > 0) {
      let booksToRemove = [];
      let box = new Box(this.generateId());

      for (let i=0; i<sortedBooks.length; i++) {
        let book = sortedBooks[i];
        if ((box.getCurrentWeight() + book.weight) <= this.boxWeight) {
          box.addBook(book);
          booksToRemove.push(i);
        }
        if (box.getCurrentWeight() == this.boxWeight) {
          break;
        }
      }
      boxes.push(box);

      sortedBooks = sortedBooks.filter( function(book, index) {
        let res = booksToRemove.find(function(removeIndex){ return  removeIndex == index });
        return res === undefined;
      });
    }
    return boxes;
  }
}

module.exports = {
  BookBoxPacker
}
