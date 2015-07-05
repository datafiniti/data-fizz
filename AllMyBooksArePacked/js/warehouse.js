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

    if (possibleBoxWeight < 10){
      box.contents.push(this.contents[0])
      box.contents.push(this.contents[indexOfLastBook]);
      this.contents.splice(0, 1);
      this.contents.splice(-1, 1);
      possibleBoxWeight += this.contents[0].shippingWeight;
      while (possibleBoxWeight < 10 && this.contents > 0) {
        console.log("possible weight = " + possibleBoxWeight);

        box.contents.push(this.contents[0]);
        this.contents.splice(0, 1);
        possibleBoxWeight += this.contents[0].shippingWeight

      }
    } else if (possibleBoxWeight > 10) {
      box.contents.push(this.contents[indexOfLastBook]);
      this.contents.splice(-1, 1);
    } else {
      box.contents.push(this.contents[0])
      box.contents.push(this.contents[indexOfLastBook]);
      this.contents.splice(0, 1);
      this.contents.splice(-1, 1);
    }
    box = new Box()
  }
  if (this.contents.length === 1) {
    box.contents.push(this.contents[0])
    this.contents.splice(0, 1);
  }
  console.log(this.contents);
  console.log(this.packedBoxes);
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

// do this until the box contents is empty
// sort the books by shippingWeight
// if you pass in an empty box..
// add together the biggest and smallest books weights
//  if that's over ten
//    remove the smaller weighted book
//    call that box done
// if that's under ten
//  pass that box back into the cycle
// if you pass in an already full box..
//  only add the smallest box
//  if it's over ten, remove the smallest box and call the box done
//  if it's under ten, put it through the cycle again