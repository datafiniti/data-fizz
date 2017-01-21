const express = require('express');
const router  = express.Router();
const Box = require("../models/Box");

// This will get the boxes with the packed books from the mongoDB
router.get('/', function(req, res) {
  // Grab every doc in the Articles array
  Box.find({})
    .populate("contents")
    .exec(function(err, result) {
      // Log any errors
      if (err) throw err
      res.send(result);   
  });
});

module.exports = router;

