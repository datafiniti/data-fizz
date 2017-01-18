const firstFitSorter = (queryResult)=>{
    const maxWeight = 10;

    const Box(maxWeight)=>{
    this.maxWeight = maxWeight;
    this.totalWeight = 0;
    this.contents = [];
    }   
    let box = new Box
    let arrayOfBoxes = [box]; 

    for (let j=0; j<queryResult.length; j++) {

        for (let i = 0; i < arrayOfBoxes; i++) {

            if (arrayOfBoxes[i].maxWeight >= queryResult[j].shipping_weight) {
                
                arrayOfBoxes[i].maxWeight -= queryResult[j].shipping_weight;
                arrayOfBoxes[i].totalWeight += queryResult[j].shipping_weight;
                arrayOfBoxes[i].contents.concat(queryResult[j]._id);

            } else {
                box = new Box;
                arrayOfBoxes.concat(box);
                arrayOfBoxes[i].maxWeight -= queryResult[j].shipping_weight;
                arrayOfBoxes[i].totalWeight += queryResult[j].shipping_weight;
                arrayOfBoxes[i].contents.concat(queryResult[j]._id);
            }
        }
    }
}