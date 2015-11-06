var Book = require('./book')
var Box = require('./box')

//Handles the logic to add new books to boxes.

function Handler() {

	this.boxes = [];
	this.products = [];
	this.currentBoxes = 0;
	this.maxWeight = 10; //TODO: hardcoded maxWeight

    //fills the internal product list with an external list of products.
    //all products will be stored here first before sorting and adding to each box.
    //we could probably skip this step altogether.
	this.fillProductList = function (product) {
		this.products.push(new Book(product));
	};

	//testing
	//normal fill, fill a Box until it's the next item doesn't fit.
	//this will lead to a bunch of unused space in the boxes.
	this.fillBoxUnordered = function () {
		if (this.products === undefined) throw Error("Called fill on empty list.");
        if (this.currentBoxes === 0) {
            this.boxes.push(this._newBox());
        };
        var self = this;
        this.products.forEach(function (prod) {
			if (self.addProductToBox(prod, self.currentBoxes) == false) { //on false create new box.
                self.boxes.push(self._newBox());
				self.addProductToBox(prod, self.currentBoxes);
				return;
            }
		});
	};
	
	//order largest to smallest.
	this.fillBoxLargestToSmallest = function () {
		if (this.products === undefined) throw Error("Called fill on empty list.");
		var tmp = this.orderByWeight(this.products);
		//take the largest, compare it to the smallest,
		//if it's > than the maxWeight, add largest to single box.
		//repeat
		this.boxes.push(this._newBox());
		var self = this;
		tmp.forEach(function (prod, i) {
			var last = tmp.pop(); //prod is the fist item in the array, last is the last one.
			var first = tmp[i];
			self._sort(first, last);
		});
	};
	
	this._sort = function (first, last) {
		var lastWeight = parseFloat(last.shipping_weight);
		var firstWeight = parseFloat(first.shipping_weight);
		var maxW = this.boxes[this.currentBoxes - 1].maxWeight;
		var currW = this.boxes[this.currentBoxes - 1].currentWeight;
		var x = lastWeight + firstWeight;
		if (currW + x >= maxW) { //both products can't fit
			if (lastWeight + currW <= maxW) { //last one fits
				this.addProductToBox(last, this.currentBoxes);
				this.boxes.push(this._newBox());
				this.addProductToBox(first, this.currentBoxes);
			}else if (firstWeight + currW <= maxW) { //first one fits
				this.addProductToBox(first, this.currentBoxes);
				this.boxes.push(this._newBox());
			    this.addProductToBox(first, this.currentBoxes);
			} else { //neither fits, making a new box
				this.boxes.push(this._newBox());
				this._sort(first, last);
			}
		} else {
			this.addProductToBox(last, this.currentBoxes);
			this.addProductToBox(first, this.currentBoxes);
		}
	}
	

	//order product list before packing	
	this.orderByWeight = function (list) {
		var ordered = this.products.sort(function (obj1, obj2) {
			return obj1.shipping_weight - obj2.shipping_weight;
		});
		return ordered;
	};
	
	this.addProductToBox = function (product, boxId) {
		return this.boxes[boxId - 1].addProduct(product); //arr idx 0, box 1, assuming boxId = currentBox
	};

	this._newBox = function () {
		this.currentBoxes++;
		return new Box(this.currentBoxes, this.maxWeight);
	};
	
	
	//testing
	//get no of boxes and % of usage per box.

}

module.exports = Handler
