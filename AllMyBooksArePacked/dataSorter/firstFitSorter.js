function Box (maxWeight) {
this.maxWeight = maxWeight;
this.totalWeight = 0;
this.contents = [];
} 

const firstFitSorter = (queryResult)=>{
    const maxWeight = 10;

    let box = new Box(maxWeight);
    let arrayOfBoxes = [box]; 

    for (let j=0; j < queryResult.length; j++) {
        for (let i = 0; i < arrayOfBoxes.length; i++) {

            let spaceLeftInBox = arrayOfBoxes[i].maxWeight - arrayOfBoxes[i].totalWeight;
            // if (spaceLeftInBox >= queryResult[j].shipping_weight) {
            if (spaceLeftInBox >= queryResult[j].shipping_weight && j < queryResult.length) {
                arrayOfBoxes[i].totalWeight += queryResult[j].shipping_weight;
                arrayOfBoxes[i].contents.push(queryResult[j]._id);
    console.log("2__________________2")
    console.log(arrayOfBoxes);

            } else {
                box = new Box(maxWeight);
                arrayOfBoxes.push(box);
                arrayOfBoxes[i].totalWeight += queryResult[j].shipping_weight;
                arrayOfBoxes[i].contents.push(queryResult[j]._id);
            }
        }
    // console.log("2__________________2")
    // console.log(arrayOfBoxes);
    }
}

module.exports = firstFitSorter;