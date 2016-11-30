const _ = require('underscore');
const Box = require('./Box.js');

class Packer {
	constructor(max_weight) {
		this.results = [];
		this.lookupTable = {};
		this.max_weight = max_weight || 10;
	}

	updateLookupTable(weight, index) {
		var weightLeft = this.max_weight - this.results[index].totalWeight;
		weightLeft = Math.round( weightLeft * 10 ) / 10;
		this.lookupTable[weightLeft] = this.lookupTable[weightLeft] || [];
		this.lookupTable[weightLeft].push(index);
	}

	checkLookupTable(weight) {
		for (var i = weight; i < this.max_weight; i += .1){
			if(this.lookupTable[i] && this.lookupTable[i].length)
				return this.lookupTable[i].slice();
		}
		return this.results.length - 1;
	}

	firstFitPack(item, max_weight) {
		max_weight = max_weight || this.max_weight;
		var index = this.checkLookupTable(item._weight);
		var results = this.results.slice(index);
    var isTooBig = _.reduce(results, (memo, box, index) => {
      if (item._weight + box.totalWeight <= max_weight && memo){
        memo = box.addItem(item);
        this.updateLookupTable(item._weight, index);
      }

      return !!memo;
    }, true);

    if (isTooBig) {
      this.results.push(new Box(this.results.length + 1, item));
      this.updateLookupTable(item._weight, this.results.length - 1);
    }
	}

	// Pack array of items (offline)
	binPack(items, max_weight) {
		max_weight = max_weight || this.max_weight;
	  this.results = [new Box(1)];

	  _.each(items, (item) => {
	    this.firstFitPack(item, max_weight);
	  });

	  return this.results;
	}

	getJSON() {
		return JSON.stringify(this.results);
	}

};


module.exports = Packer;