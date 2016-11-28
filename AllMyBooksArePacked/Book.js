const _ = require('underscore');

class Book {
	constructor(book) {
		_.extend(this, {
			'title': book.title,
			'isbn-10': book.isbn,
			'price': book.price,
			'shipping_weight': book.weight,
			'author': book.author,
			'_weight': parseFloat(book.weight)
		});
	}
};

module.exports = Book;