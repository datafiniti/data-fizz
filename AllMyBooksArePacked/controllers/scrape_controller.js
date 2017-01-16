const express = require('express');
const router  = express.Router();
// Our scraping tools
const cheerio = require("cheerio");
const Book = require("../models/Book");
// const fileReader = require('../fileReader/fileReader')

// A GET request to scrape the html file passed to it
// router.get("/scrape", function(req, res) {
const fileReader = ()=>{
  const path = '../data/';
  const fs = require('fs');
  let html = '';
  // reads the files in a directory and returns the name of the files as an array
  fs.readdir(path, 'utf-8', (err, dirData) =>{
    if (err) throw err;
    // for each element of the array fead its contents
    dirData.forEach((fileName)=>{
      // reads the contents of the file and returns the result to the variable contents
      html = fs.readFileSync(path + fileName, 'utf8');
      scrape(html);
    });
  });
}	

let scrape = (html)=>{
	// Then, we load that into cheerio and save it to $ for a shorthand selector
	let $ = cheerio.load(html);

	// Save an empty result object
	let result = {};

	// Grabs the title of the book:
	$("div.buying h1.parseasinTitle").each(function(i, element) {

		result.title = $(this).children("span").text()
			.replace(' [Hardcover]','')
			.replace(' [Deckle Edge]','')
			.replace(' [Paperback]','');
	});

	// Grabs the author of the book:
	$("div.buying h1.parseasinTitle").next().each(function(i, element) {

		result.author = $(this).children().text().replace('(Author)',', ').replace('(Author)','  ');
		result.author = result.author.slice(0,-2);
	});

	// Grabs the price of the book. Handles cases where the price lives in a span with the id actualPriceValue:
	if ($("span#actualPriceValue")) {
		$("span#actualPriceValue").each(function(i, element) {

			result.price = $(this).text().replace('$','');		
		});
	}	

	// Grabs the price of the book. Handles cases where the price lives in a table column with the class rightBorder buyNewOffers:
	if ($("td.rightBorder.buyNewOffers")) {
		$("td.rightBorder.buyNewOffers").each(function(i, element) {

			result.price = $(this).children('span.rentPrice').text().replace('$','');	
		});
	}	

	// Grabs the shipping weight of the book:
	$("div.content ul li").each(function(i, element) {

 		if ($(this).children('b').text() === 'Shipping Weight:') {
			resultAsString = $(this).text()
				.replace('Shipping Weight: ','')
				.replace(' pounds (View shipping rates and policies)','');
			resultAsFloat = parseFloat(resultAsString);
			result.shipping_weight = resultAsFloat;
		}
	});

	// Grabs the isbn-10 number of the book:
	$("div.content ul li").each(function(i, element) {

 		if ($(this).children('b').text() === 'ISBN-10:') {
			result.isbn10 = $(this).text()
				.replace('ISBN-10: ','');
		}
	});
		console.log(result);

	// Using our Book model, create a new entry
	// This effectively passes the result object to the entry
	var entry = new Book(result);

	// Now, save that entry to the db
	entry.save(function(err, doc) {
	// Log any errors
		if (err) {
		  console.log(err);
		}
		// Or log the doc
		else {
		  console.log(doc);
		}
	});

	// Tells us the scrape was succesful
	console.log("Scrape Complete");
}
// });
fileReader();

module.exports = router;

