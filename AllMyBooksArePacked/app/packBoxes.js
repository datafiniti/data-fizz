var fs = require('fs');
var nextFit = require('./findNextFit.js');
var jsonMods = require('./jsonArray.js');

exports.packBoxes = function (inputDir, query, maxWeight){
    var jsonArr = jsonMods.jsonFilesToArray(inputDir);
    jsonArr = jsonMods.sortJsonArrayPrice(jsonArr, query);
    jsonArr.length > 0 ? packBox(jsonArr, maxWeight, query) : console.log("Packbox requires input array size greater than 0.");
}

function packBox(arr, maxWeight, query) {
    var booksArr = arr.slice();
    var allBoxes = [];
    var id = 1;

    while( booksArr.length > 0){
        var newBox = {
            box : {
                id: id,
                totalWeight: "",
                contents: ""
            }
        };

        var totalWeight = parseFloat(booksArr[0][query]);
        totalWeight.toFixed(1);
        var massType = booksArr[0][query].replace(/[0-9]\W/g, '');

        var currentBoxContents = [];
        currentBoxContents.push(booksArr.shift());
        while ( booksArr.length > 0 ){
            var nextBook = nextFit.findNextFit(booksArr, maxWeight, totalWeight);
            if (nextBook === undefined || totalWeight >= maxWeight) {
                break;
            }
            else {
                // add book and weight to current box
                currentBoxContents.push(nextBook);
                totalWeight += parseFloat(nextBook[query]);
                totalWeight.toFixed(1);

                // remove book from booksArr
                var index = booksArr.indexOf(nextBook);
                booksArr.splice(index, 1);
            }
        }
        newBox.box.totalWeight = totalWeight.toFixed(1).toString() + ' ' + massType;
        newBox.box.contents = currentBoxContents;
        id++;
        allBoxes.push(newBox);
    }
    fs.writeFile('./boxResults.json', JSON.stringify(allBoxes, null, 4), function(err) {});
}