class Box {
	constructor(id, item) {
		this._id = id;
		this.totalWeight = 0;
		this._contents = [];
		if (item)
			this.addItem(item);
	}

	addWeight(weight){
		this.totalWeight += weight;
	}

	addItem(item) {
		this._contents.push(item);
		this.addWeight(item._weight);
	}
};

module.exports = Box;