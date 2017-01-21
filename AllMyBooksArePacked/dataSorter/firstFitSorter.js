// represents the maximum capacity of the box
const spaceRemaining = 10;
let box = new Box(spaceRemaining);
let arrayOfPackedBoxes = [];

const firstFitSorter = (queryResult, cb)=>{
    // The algorithm checks to see if chosen book's weight is less than or equal to the remaining weight capacity of the box,
    // if it is then 'add' the book by modifying the characterisitics the box model to show that the box contains a book.
    // else grab a new box and place the book in that box.
    
    for (let i=0; i < queryResult.length; i++) {
        let j;
        for (j = 0; j < arrayOfPackedBoxes.length; j++) {
            if (arrayOfPackedBoxes[j].spaceRemaining >= queryResult[i].shipping_weight) {
                arrayOfPackedBoxes[j].spaceRemaining -= queryResult[i].shipping_weight
                arrayOfPackedBoxes[j].totalWeight += queryResult[i].shipping_weight;
                arrayOfPackedBoxes[j].contents.push(queryResult[i]._id);
                break;
            } 
        }
        // If no box could accommodate the book at queryResult[i]
        if (j==arrayOfPackedBoxes.length) {
            box = new Box(spaceRemaining);
            arrayOfPackedBoxes.push(box);
            arrayOfPackedBoxes[arrayOfPackedBoxes.length-1].spaceRemaining -= queryResult[i].shipping_weight; 
            arrayOfPackedBoxes[j].totalWeight += queryResult[i].shipping_weight;
            arrayOfPackedBoxes[j].contents.push(queryResult[i]._id); 
        }
    }
    cb(null, arrayOfPackedBoxes);
}

// constructor that creatses a box object that hold all the data needed to map it to the database
function Box (spaceRemaining) {
this.spaceRemaining = spaceRemaining;
this.totalWeight = 0;
this.contents = [];
}

module.exports = firstFitSorter;