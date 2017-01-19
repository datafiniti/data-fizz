const bookMaker = (resultArray)=> {
const Book = require("../models/Book");
const sortByWeightDecending = require("../queries/sortByWeightDecending")
let count = 1;

	resultArray.forEach((result)=>{
		// Using our Book model, create a new entry
		// This effectively passes the result object to the entry
		let entry = new Book(result);

		// Now, save that entry to the db
		entry.save(function(err, doc) {
		// Log any errors
			if (err) {
			  console.log(err);
			}
			// Or log the doc
			else {
			  	console.log(doc);
			  	console.log("Model Created");
			  	console.log('rA: '+ resultArray.length);
			  	console.log('c: '+ count);

			}
		});

		if (count === resultArray.length) {
			sortByWeightDecending();
		}
		count++
	});
}


module.exports = bookMaker;