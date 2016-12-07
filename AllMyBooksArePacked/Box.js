'use strict';

module.exports = class Box {

  constructor(contents, capacity){
    this.contents = contents || [];
    this.capacity = capacity || 10; //arbitrary default capacity
    this.totalWeight = this.contents.reduce(function(weight, product){
      return (weight + parseFloat(product.weight)).toPrecision(2);
    }, 0) + " pounds";   
  }

  weigh(){
    return parseFloat(this.totalWeight);
  }

  roomLeft(){
    return (this.capacity - this.weigh());
  }

  load(product){
    this.contents = this.contents.concat(product);
    this.totalWeight = (parseFloat(this.totalWeight) + parseFloat(product.weight)).toPrecision(2) + " pounds";
  }

}
