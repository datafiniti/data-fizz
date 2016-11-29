const _ = require('underscore');
const Packer = require('./Packer.js');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path')

class Extractor {
	constructor() {
		this.extracted = [];
		this.packer = new Packer(10);
	}

	getHtmlFiles(dir, callback) {
		const filenames = fs.readdirSync(dir);
		const promises = _.map(filenames, (filename) => {
			return fs.readFileAsync(`${dir}/${filename}`, 'utf8')
				.then(callback);
		});
		return Promise.all(promises);
	}

	getHtmlFilesSync(dir, callback) {
		const filenames = fs.readdirSync(dir);
		_.each(filenames, (filename) => {
			const html = fs.readFileSync(`${dir}/${filename}`, 'utf8');
			callback(html);
		});

		return this.extracted;
	}

	addItem(item) {
		if (!this.extracted.length){
			this.extracted.push(item);
		} else {
			const index = this.insertAt(item._weight);
			this.extracted.splice(index, 0, item);
		}
	}

	insertAt(target, start, end){
		// used binary descending to maintain order during insert
		start = start || 0;
		end = end || this.extracted.length - 1;
		const mid = (start + end)/2 | 0;
		const mid_weight = this.extracted[mid]._weight;
		if (end - start <= 1 || mid_weight === target)
			return mid_weight > target ? mid + 1 : mid;
		else if (mid_weight > target)
			return this.insertAt(target, mid, end);
		else if (mid_weight < target)
			return this.insertAt(target, start, mid);
	}
};

module.exports = Extractor;
