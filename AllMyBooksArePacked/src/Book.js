'use strict';

class Book {
	constructor(title, author, price, weight, isbn10) {
		this.title = title;
		this.author = author;
		this.price = price;
		this.weight = weight;
		this.isbn10 = isbn10;
	}
	getObject() {
		return {
			title: this.title,
			price: this.price,
			author: this.author,
			weight: this.weight,
			isbn10: this.isbn10
		}
	}
}

module.exports = {
	Book
}
