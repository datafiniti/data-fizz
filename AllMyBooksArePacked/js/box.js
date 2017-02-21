function Box(){
  this.totalWeight;
  this.contents = [];
}

Box.prototype.updateTotalWeight = function(){
  var combinedWeight = 0;
  for (var i = 0; i < this.contents.length; i++){
    combinedWeight += this.contents[i].shippingWeight;
  }
  this.totalWeight = combinedWeight.toFixed(2);
}