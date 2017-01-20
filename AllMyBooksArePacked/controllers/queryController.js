const express = require('express');
const router  = express.Router();
const sortByWeightDecending = require('../queries/sortByWeightDecending')

// A GET request to scrape the html file passed to it
router.get("/query", function(req, res) {
	sortByWeightDecending();
});

module.exports = router;

