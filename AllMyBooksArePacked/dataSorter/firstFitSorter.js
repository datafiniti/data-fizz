function Box (spaceRemaining) {
this.spaceRemaining = spaceRemaining;
this.totalWeight = 0;
this.contents = [];
} 

const firstFitSorter = (queryResult)=>{
    const spaceRemaining = 10;
    let boxCount = 0;

    let box = new Box(spaceRemaining);
    let arrayOfBoxes = []; 

    for (let i=0; i < queryResult.length; i++) {
        let j;
        for (j = 0; j < boxCount; j++) {
            if (arrayOfBoxes[j].spaceRemaining >= queryResult[i].shipping_weight) {
                arrayOfBoxes[j].spaceRemaining -= queryResult[i].shipping_weight
                arrayOfBoxes[j].totalWeight += queryResult[i].shipping_weight;
                arrayOfBoxes[j].contents.push(queryResult[i]._id);
    console.log("2__________________2")
    console.log(arrayOfBoxes);
                break;

            } 
        }
        // If no box could accommodate the book at queryResult[i]
        if (j==boxCount) {
            box = new Box(spaceRemaining);
            arrayOfBoxes.push(box);
            arrayOfBoxes[boxCount].spaceRemaining -= queryResult[i].shipping_weight; 
            arrayOfBoxes[j].totalWeight += queryResult[i].shipping_weight;
            arrayOfBoxes[j].contents.push(queryResult[i]._id); 
            boxCount++;
        }

    }
}



module.exports = firstFitSorter;