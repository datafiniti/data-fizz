const _ = require('underscore');
const Box = require('./Box.js');

class Packer {
	constructor(max_weight) {
		this.results = [];
		this.max_weight = max_weight || 10;
	}

	// Pack book individual - async (online)
	packOne(book, max_weight) {
		this.firstFitPack(book, max_weight);
	}

	firstFitPack(item, max_weight) {
		max_weight = max_weight || this.max_weight;
    var isTooBig = _.reduce(this.results, (memo, box) => {
      if (item._weight + box.totalWeight <= max_weight && memo)
        memo = box.addItem(item);
      return !!memo;
    }, true);

    if (isTooBig) 
      this.results.push(new Box(this.results.length + 1, item));
	}

	// Pack array of books (offline)
	binPack(books, max_weight) {
		max_weight = max_weight || this.max_weight;
	  this.results = [new Box(1)];

	  _.each(books, (book) => {
	    this.firstFitPack(book, max_weight);
	  });

	  return this.results;
	}

};


module.exports = Packer;