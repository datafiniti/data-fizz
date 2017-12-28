'use strict';

const addBox = (boxes, currentIndex, currentWeight, currentContents) => {
    boxes.push({
        id: currentIndex,
        totalWeight: currentWeight + ' pounds',
        contents: currentContents
    });
    return boxes;
};
const sortBooks = (books) => {
    const sortedBooks = books.sort(function(book1, book2) {
        const weight1 = parseFloat(book1.shippingWeight.substring(0, book1.shippingWeight.indexOf('pounds')));
        const weight2 = parseFloat(book2.shippingWeight.substring(0, book2.shippingWeight.indexOf('pounds')));
        return weight2 - weight1;
    });
    return sortedBooks;
};
const packBooksInBoxes = (books) => {
    let boxes = [];
    let currentIndex = 1;
    let currentWeight = 0;
    let currentContents = [];
    const sortedBooks = sortBooks(books);
    sortedBooks.forEach((book, index) => {
        const tempWeight = parseFloat(book.shippingWeight.substring(0, book.shippingWeight.indexOf('pounds')));
        if(currentWeight + tempWeight > 10) {
            boxes = addBox(boxes, currentIndex++, currentWeight, currentContents);
            currentWeight = 0;
            currentContents = [];
        }
        currentWeight += tempWeight;
        currentContents.push({
            'title': book.title,
            'price': book.price,
            'author': book.author,
            'shipping_weight': book.shippingWeight,
            'isbn-10': book.isbn10
        });
        if(index === books.lenght) {
            boxes = addBox(boxes, currentIndex, currentWeight, currentContents);
        }
    });
    return boxes;
};

module.exports = {
    packBooksInBoxes
};