function Box(id, maxWeight){
	this.boxId = id;
	this.maxWeight = maxWeight;
	this.currentWeight = 0.0;
    this.totalProducts = 0;
	this.contents = []; 

	this.addProduct = function(product){
        var w = parseFloat(product.shipping_weight);
        if (this.checkWeight(w)){ //weight surpassed
            throw Error("Max constraint broken"); //change this back to return false
        }else{
            this.currentWeight += w;
            this.totalProducts++;
            this.contents.push(product);
        }
	};

    this.checkWeight = function(productWeight){
        return (productWeight+ this.currentWeight > this.maxWeight);
    };
}



module.exports = Box;
