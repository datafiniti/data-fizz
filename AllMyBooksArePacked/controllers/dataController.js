const express = require('express');
const router  = express.Router();
const dataReader = require('../dataReader/dataReader')
const dataScraper = require('../dataScraper/dataScraper');

// A GET request to scrape the html file passed to it
router.get("/", function(req, res) {
	// calls the data reader function that reads the contents of the data folder
	dataReader().then((htmlArray)=>{
	    // calls data scraping function and sends the extracted html array
      	dataScraper(htmlArray);
    });
});

module.exports = router;

