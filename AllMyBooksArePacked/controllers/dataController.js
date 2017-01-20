const express = require('express');
const router  = express.Router();
const dataReader = require('../dataReader/dataReader')
// A GET request to scrape the html file passed to it
router.get("/", function(req, res) {
	dataReader().then((htmlArray)=>{
		dataScraper(htmlArray);
	});
});

module.exports = router;

