var Product = require('./product'),
inherits = require('util').inherits;

function Book(productDefinition){

	var name = productDefinition['name'];
	var price = productDefinition['price'];
	var publisher = productDefinition['publisher'];
	var publishDate = productDefinition['publishDate'];
	var language = productDefinition['language'];
	var isbn10 = productDefinition['isbn10'];
	var isbn13 = productDefinition['isbn13'];
	var pages = productDefinition['pages'];
	var shipping_weight = productDefinition['weight'];
	var author = productDefinition['author'];

	this.author = author;
	this.isbn10 = isbn10;
	this.isbn13 = isbn13;
	this.publisher = publisher;
	this.date = publishDate;
	this.language = language;
	this.pages = pages;

	Product.call(this, name, shipping_weight, price);
}

inherits(Book, Product);

module.exports = Book;
