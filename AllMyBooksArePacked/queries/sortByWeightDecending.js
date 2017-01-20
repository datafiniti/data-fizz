const sortByWeightDecending = ()=> {
  const Book = require("../models/Book");
  const firstFitSorter = require("../dataSorter/firstFitSorter");

  // Grab every doc in the Books array
  Book.find({}).sort('-shipping_weight')
    .exec(function(error, result) {
      // throw any errors
      if (error) throw error;

    })
    .then((queryResult)=>{
      firstFitSorter(queryResult);
    });
}

module.exports = sortByWeightDecending;