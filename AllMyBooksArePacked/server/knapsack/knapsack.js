var Quicksort = require("../quicksort/quicksort.js");



exports.getBoxes = function (items, capacity) {
    items = Quicksort.sort(items);
    return generateBoxes(items, capacity);


}

function generateBoxes(items, capacity) {
    var boxes = [];


    var id = 1;
    while (items.length > 0) {
        var b = {};
        b.box = generateBox(items, capacity, id)
        boxes.push(b);
        id++;
    }

    return boxes;

}

function generateBox(items, capacity,_id) {
    var box = {
        id: _id,
        totalWeight: 0,
        contents: []
    };
    while (items.length > 0) {

        if (box.totalWeight + getWeight(items[0]) <= capacity) {
            //console.log("cicle for id: " + _id + " length: " + items.length + " weight added: "+getWeight(items[0]) + " total weight: "+ box.totalWeight );
            box.totalWeight += getWeight(items[0]);
            box.contents.push(items.shift());
       } else {
           break;
        }
    }


    return box;
}

function getWeight(book) {
    return parseFloat(book.shipping_weight.split(" ")[0]);
}

