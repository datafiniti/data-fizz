const _ = require('underscore');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

class Extractor {
	constructor() {
		this.extracted = [];
	}

	getHtmlFiles(dir, callback) {
		const filenames = fs.readdirSync(dir);
		const promises = _.map(filenames, (filename) => {
			return fs.readFileAsync(`${dir}/${filename}`, 'utf8')
				.then((html) => {
					var item = this.scrape(html);
					this.addItem(item);
					if (callback)
						callback(item);
				});
		});
		return Promise.all(promises);
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
