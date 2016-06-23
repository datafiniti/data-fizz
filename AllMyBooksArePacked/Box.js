'use strict';

module.exports = class Box {

  constructor(contents){
    this.contents = contents || [];
    this.totalWeight = this.contents.reduce(function(weight, product){
      return (weight + parseFloat(product.weight)).toPrecision(2);
    }, 0) + " pounds";   
  }

  load(product){
    this.contents = this.contents.concat(product);
    this.totalWeight = (parseFloat(this.totalWeight) + parseFloat(product.weight)).toPrecision(2) + " pounds";
  }

}
