function Warehouse(){
  this.contents = [];
}

Warehouse.prototype.packBoxes = function(){
  this.sortContentsByShippingWeight();
  console.log(this.contents);
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