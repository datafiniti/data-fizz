const express = require('express');
const router  = express.Router();
const dataReader = require('../dataReader/dataReader')
const sortByWeightDecending = require('../queries/sortByWeightDecending')

// A GET request to scrape the html file passed to it
router.get("/", function(req, res) {
	// dataReader();
	sortByWeightDecending();
});

module.exports = router;

