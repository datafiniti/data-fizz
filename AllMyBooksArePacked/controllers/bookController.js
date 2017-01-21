const express = require('express');
const router  = express.Router();
const Book = require("../models/Book");
const dataReader = require('../dataReader/dataReader')
const dataScraper = require('../dataScraper/dataScraper');
const bookMaker = require('../bookMaker/bookMaker');

// A GET request to scrape the html documents in the data folder
router.get("/", function(req, res) {
	dataReader((htmlArray)=>{
		dataScraper(htmlArray, (resultArray)=>{
			bookMaker(resultArray)
      // .then(()=>{
				// res.send("Books have been made!!!")
				// res.redirect('/boxes');
			// })
		});
	});
});

module.exports = router;

