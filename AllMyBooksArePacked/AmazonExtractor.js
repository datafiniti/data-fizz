// Classes
const Extractor = require('./Extractor.js');
const Book = require('./Book.js');

// Utils and Libs
const _ = require('underscore');
const cheerio = require('cheerio');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

class AmazonExtractor extends Extractor {

	constructor() {
		super(Extractor);
		_.extend(this, {
			'title': () => this.$('#btAsinTitle', '.parseasinTitle').text().split(' [')[0],
			'author': () => this.$('.parseasinTitle').next().children().first().text(),
			'price': () => this.$('.bb_price', '.buyingDetailsGrid').text().trim().split(' ')[0],
			'weight': () => this.$('li:contains("Shipping Weight:")', '.content').children()['0'].next.data.trim().split(' (')[0],
			'isbn': () => this.$('li:contains("ISBN-10")', '.content').children()['0'].next.data.trim()
		});
	}

	extractAndPack(dir) {
		var callback = (book) => {	
			this.packer.packOne(book);
		};

		return this.getBooks(dir, callback);
	}

	getBooks(dir, callback) {
		return this.getHtmlFiles(dir, callback);
	}

	scrape(html) {
		this.$ = cheerio.load(html);
		return new Book({
			'title': this.title.call(this),
			'author': this.author.call(this),
			'price': this.price.call(this),
			'weight': this.weight.call(this),
			'isbn': this.isbn.call(this),
		});
	}
};

module.exports = AmazonExtractor;