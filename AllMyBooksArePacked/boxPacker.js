var fs = require('fs');
var dataFolder = './jsonData/';


jsonArr = jsonFilesToSortedArray(dataFolder);


//console.log(jsonArr[0]['shippingWeight']);
packing(jsonArr, 10);




function jsonFilesToSortedArray(dir) {
    var results = [];
    fs.readdirSync(dir).forEach(function(file) {
    	var json = JSON.parse(require('fs').readFileSync(dataFolder + file, 'utf8'));
    	results.push(json);
    });
    results.sort(function(a, b) {
    	return parseFloat(a.shippingWeight) - parseFloat(b.shippingWeight);
	}).reverse();

    return results;
};

function packing(arr, max) {
	if(arr.length > 0) {
		var box = {
			id: "",
			totalWeight: "",
			contents: ""
		}

		var largest = arr.shift();
		var totalWeight = parseFloat(largest['shippingWeight']);
		totalWeight += parseFloat(arr[arr.length / 2]['shippingWeight']);
		if ( totalWeight + parseFloat(arr[arr.length / 2]['shippingWeight']) > max )
		var contents = largest;

		console.log(totalWeight);
		//packing(arr, max)
	}
}

function test(arr, max, weight) {
	testArr = [];
	if( weight == max || arr.length == 0 ) {
		return testArr
	}
	else{
		testWeight = parseFloat(arr[arr.length/2]['shippingWeight']);
		if ( (weight + testWeight) > max
	}
}