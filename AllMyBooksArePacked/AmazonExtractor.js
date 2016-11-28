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
	}

	getBooks(dir) {

	}

	getBooksSync(dir) {

	}

	dataMine(html) {

	}
};

module.exports = AmazonExtractor;