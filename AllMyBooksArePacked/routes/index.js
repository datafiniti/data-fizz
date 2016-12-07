var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var html = require('html');
var amazonBook = require('amazonBook');
var nextfit = require('nextfit');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {	
	// get html from page
	// two ways

		// url  =>  html.get("url","http://google.com");
		// local files =>  html.get("local","./data");

	function startWebScraping(){
		// get html 
		html.get("local","./data",function(html){
			
			// make html to an array of json docs 
			amazonBook.json(html,function(jsonarray){

				// arrange the json docs from array into least number of boxes
				nextfit.arrange(jsonarray,function(jsonarranged){
					
					// ouput json
					res.setHeader('Content-Type', 'application/json');
    				res.send(jsonarranged);
					
				});
			});
		});
	}

	startWebScraping();
});

module.exports = router;

