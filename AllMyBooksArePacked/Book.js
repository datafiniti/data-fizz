class Book {
	constructor(book) {
		this['title'] = book.title;
		this['isbn-10'] = book.isbn;
		this['price'] = book.price;
		this['shipping_weight'] = book.weight;
		this['author'] = book.author;
	}
};

module.exports = Book;