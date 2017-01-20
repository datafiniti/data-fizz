const bookMaker = (resultArray)=> {
const Book = require("../models/Book");
const Promise = require("bluebird");
	
	return Promise.try(()=>{
		resultArray.forEach((result)=>{
			// Using our Book model, create a new entry
			// This effectively passes the result object to the entry
			let entry = new Book(result);
			// Now, save that entry to the db
			entry.save(function(err, doc) {
				// Log any errors
				if (err) throw err;
				// Or log the doc
				// console.log(doc);
			});

		});
		console.log("Books added to database");

	});
}


module.exports = bookMaker;