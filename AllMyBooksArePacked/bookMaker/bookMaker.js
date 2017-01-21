const bookMaker = (resultArray)=> {
const Promise = require("bluebird");
const Book = require("../models/Book");

	// return Promise.try(()=>{
		console.log(resultArray.length)
		// resultArray.forEach((result)=>{
		// 	// Using our Book model, create a new entry
		// 	// This effectively passes the result object to the entry
		// 	let entry = new Book(result);
		// 	// Now, save that entry to the db
		// 	entry.save(function(err, doc) {
		// 	// Log any errors
		// 		if (err) throw err;
		// 	})

		// })
	// })
}


module.exports = bookMaker;