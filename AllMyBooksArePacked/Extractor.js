const _ = require('underscore');
const Packer = require('./Packer.js');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

class Extractor {
	constructor() {

	}

	getHtmlFiles(dir, callback) {

	}

	getHtmlFilesSync(dir, callback) {

	}

	addItem(item) {

	}

	getPacker() {
		return this.packer;
	}
};

module.exports = Extractor;
