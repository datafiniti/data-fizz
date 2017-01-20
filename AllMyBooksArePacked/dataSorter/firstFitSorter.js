const firstFitSorter = (queryResult)=>{
    const dataPacker = require("../dataPacker/dataPacker");
    const spaceRemaining = 10;
    let box = new Box(spaceRemaining);
    let arrayOfPackedBoxes = []; 

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
    dataPacker(arrayOfPackedBoxes);
}

function Box (spaceRemaining) {
this.spaceRemaining = spaceRemaining;
this.totalWeight = 0;
this.contents = [];
} 

module.exports = firstFitSorter;