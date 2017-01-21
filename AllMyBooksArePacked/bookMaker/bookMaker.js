const Book = require("../models/Book");

const bookMaker = (resultArray, cb)=> {
	Book.insertMany(resultArray, (err, result)=> {
		cb(err, result);
		console.log("Books have been stored successfully")
	});
}

module.exports = bookMaker;