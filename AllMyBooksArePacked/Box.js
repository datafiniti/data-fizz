'use strict';

module.exports = class Box {

  constructor(contents){
    this.contents = contents || [];
    this.weight = this.contents.reduce(function(weight, product){
      return weight + parseFloat(product.weight);
    }, 0);    
  }

  load(product){
    this.contents = this.contents.concat(product);
    this.weight += parseFloat(product.weight);
  }

}
