const express = require('express');
const router  = express.Router();
const Book = require("../models/Book");
const dataReader = require('../dataReader/dataReader')
const dataScraper = require('../dataScraper/dataScraper');
const bookMaker = require('../bookMaker/bookMaker');
const sortByWeightDecending = require('../queries/sortByWeightDecending');
const firstFitSorter = require("../dataSorter/firstFitSorter");
const boxMaker = require('../boxMaker/boxMaker');

// A GET request to scrape the html documents in the data folder
router.get("/", function(req, res) {
	dataReader((err, htmlArray)=>{
    if (err) throw err;
		dataScraper(htmlArray, (err, resultArray)=>{
			bookMaker(resultArray, ()=>{
        if (err) throw err;
        sortByWeightDecending((err, queryResult)=>{
          if (err) throw err;
          firstFitSorter(queryResult, (err, arrayOfPackedBoxes)=>{
            if (err) throw err;
            boxMaker(arrayOfPackedBoxes, ()=>{
              res.redirect('/boxes');
            });
          });
        });
      });
		});
	});
});

module.exports = router;

