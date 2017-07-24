'use strict';
const request = require('request');
const cheerio = require('cheerio');
const bookUrl = require('../config/config.js').bookUrl;

const Book = require('./Book').Book;

class BookScrapper {
	getRequestOptions(bookPath) {
		return {
			url: `${bookUrl}/${bookPath}`
		};
	}
	getValue($, ...selectors) {
		if (selectors === undefined && selectors.length <= 0) { return ''; }
		var value = '';
		for(var i in selectors) {
			value = $(selectors[i]).text()
			if (value !== '') {
				break
			}
		}
		return value;
	}
	handleBookScrapping(error, response, body) {
		const $ = cheerio.load(body);
		const price = this.getValue($, '.priceLarge', '.rentPrice');
		const title = $('#btAsinTitle').text();
		const author = $('.buying>span>a').text();
		const isbn10 = $(".bucket .content>ul li:contains('ISBN-10')").text().split(' ')[1];
		const weight = $(".bucket .content>ul li:contains('Shipping Weight')").text().split(' ')[2];

		const book = new Book(title, author, price, weight, isbn10);
		console.log(book.getObject());
	}
	getBookRequestOptions() {
		const bookRequests = [];
		for (var index = 1; index<=20; index++) {
			bookRequests.push(this.getRequestOptions(`book${index}.html`));
		}
		return bookRequests;
	}
	scrapBooks() {
		const bookRequestOptions = this.getBookRequestOptions();
		for (var i=0; i<bookRequestOptions.length; i++) {
			request(bookRequestOptions[i], this.handleBookScrapping.bind(this));
		}
	}
}

module.exports = {
	BookScrapper
}
