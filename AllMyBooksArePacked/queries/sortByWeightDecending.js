const Book = require("../models/Book");

const sortByWeightDecending = (cb)=> {

	Book.find({}).sort('-shipping_weight').exec().then((queryResult)=>{
	  cb(null, queryResult);
	}).catch((err)=> {
	  // throw any errors
	  cb(err);
	})
}

module.exports = sortByWeightDecending;