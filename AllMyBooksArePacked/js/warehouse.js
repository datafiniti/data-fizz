function Warehouse(){
  this.contents = [];
}

Warehouse.prototype.packBoxes = function(){
  console.log(this.contents.length);
}