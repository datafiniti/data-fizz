const dataSorter = require('../dataSorter/dataSorter');
const Book = require("../models/Book");

const bookMaker = (result)=> {
	// Using our Book model, create a new entry
	// This effectively passes the result object to the entry
	var entry = new Book(result);

	// Now, save that entry to the db
	entry.save(function(err, doc) {
	// Log any errors
		if (err) {
		  console.log(err);
		}
		// Or log the doc
		else {
		  console.log(doc);
		}
	});
	// Tells us the scrape was succesful
	console.log("Model Created");
}

module.exports = bookMaker;