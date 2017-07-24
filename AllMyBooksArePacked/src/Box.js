'use strict';

class Box {
	constructor(id, totalWeight = 0.0, contents = []) {
		this.box = {
			id,
			totalWeight,
			contents
		}
	}
	addBook(book) {
		this.box.totalWeight += book.weight;
		this.box.contents.push(book);
	}
	getCurrentWeight() {
		return this.box.totalWeight;
	}
}

module.exports = {
	Box
}
