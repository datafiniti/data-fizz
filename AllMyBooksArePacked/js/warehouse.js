function Warehouse(){
  this.contents = [];
  this.packedBoxes = [];
}

Warehouse.prototype.packBoxes = function(){
  this.sortContentsByShippingWeight();
  var box = new Box();
  while (this.contents.length > 1) {
    this.packedBoxes.push(box);
    var indexOfLastBook = this.contents.length - 1;
    var possibleBoxWeight = this.contents[0].shippingWeight + this.contents[indexOfLastBook].shippingWeight;

    box.contents.push(this.contents[indexOfLastBook]);
    this.contents.splice(-1, 1);

    if (possibleBoxWeight <= 10){
      box.contents.push(this.contents[0])
      this.contents.splice(0, 1);
      if (possibleBoxWeight < 10 ) {
        possibleBoxWeight += this.contents[0].shippingWeight;
        while (possibleBoxWeight < 10 && this.contents > 0) {
          box.contents.push(this.contents[0]);
          this.contents.splice(0, 1);
          possibleBoxWeight += this.contents[0].shippingWeight
        }
      }
    }
    box = new Box()
  }
  if (this.contents.length === 1) {
    box.contents.push(this.contents[0])
    this.contents.splice(0, 1);
  }
}

Warehouse.prototype.sortContentsByShippingWeight = function(){
  var sorted = false;
  while (!sorted){
    sorted = true;
    for (var i = 0; i < this.contents.length - 1; i++){
      if (this.contents[i].shippingWeight > this.contents[i+1].shippingWeight){
        var temp = this.contents[i];
        this.contents[i] = this.contents[i+1];
        this.contents[i+1] = temp;
        sorted = false;
      }
    }
  }
}
