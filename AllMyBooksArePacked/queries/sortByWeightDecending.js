const sortByWeightDecending = ()=> {
  const mongoose = require("mongoose");
  const Book = require("../models/Book");
  const firstFitSorter = require("../dataSorter/firstFitSorter");

  // Grab every doc in the Books array
  Book.find({}).sort('-shipping_weight')
    .exec(function(error, queryResult) {
      // Log any errors
      if (error) {
        console.log(error);
      } else {
        console.log('__________________')
        console.log(queryResult);
        firstFitSorter(queryResult);
      }   
    });
}

module.exports = sortByWeightDecending;