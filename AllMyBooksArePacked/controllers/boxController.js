const express = require('express');
const router  = express.Router();
const Book = require("../models/Book");
const firstFitSorter = require("../dataSorter/firstFitSorter");
const boxMaker = require('../boxMaker/boxMaker');

// A GET request to pack the boxes with books created from the scraped html documents
router.get('/', function(req, res) {
  // Grab every doc in the Books array
  Book.find({}).sort('-shipping_weight').exec(function(error, result) {
    // throw any errors
    if (error) throw error;
  })
  .then((queryResult)=>{
    firstFitSorter(queryResult, (arrayofPackedBoxes)=>{
      boxMaker(arrayofPackedBoxes)
      // .then(()=>{
      //   res.redirect('/data');
      // });
    });
  });
});

// This will get the boxes with the packed books from the mongoDB
router.get("/data", function(req, res) {
  // Grab every doc in the Articles array
  Box.find({})
    .populate("contents")
    .exec(function(error, result) {
      // Log any errors
      if (error) {
        console.log(error);
      } else {
        res.send(result);   
      }
  });
});

module.exports = router;

