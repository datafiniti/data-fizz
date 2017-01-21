const cheerio = require("cheerio");

const dataScraper = (htmlArray, cb)=> {
	// gather all results into an array
	let resultArray = [];
	
	htmlArray.forEach((html)=>{	
		// Save an empty result object
		let result = {};

		// Then, we load that into cheerio and save it to $ for a shorthand selector
		let $ = cheerio.load(html);

		// Grabs the title of the book:
		$("div.buying h1.parseasinTitle").each(function(i, element) {

			result.title = $(this).children("span").text()
				.replace(' [Hardcover]','')
				.replace(' [Deckle Edge]','')
				.replace(' [Paperback]','');
		});

		// Grabs the author of the book:
		$("div.buying h1.parseasinTitle").next().each(function(i, element) {

			result.author = $(this).children().text()
				.replace('(Author)',', ')
				.replace('(Author)','  ')
				.replace('(Forewor','');
			result.author = result.author.slice(0,-2);
		});

		// Grabs the price of the book. Handles cases where the price lives in a span with the id actualPriceValue:
		if ($("span#actualPriceValue")) {
			$("span#actualPriceValue").each(function(i, element) {

				result.price = $(this).text() + ' USD';		
			});
		}	

		// Grabs the price of the book. Handles cases where the price lives in a table column with the class rightBorder buyNewOffers:
		if ($("td.rightBorder.buyNewOffers")) {
			$("td.rightBorder.buyNewOffers").each(function(i, element) {

				result.price = $(this).children('span.rentPrice').text() + ' USD';	
			});
		}	

		// Grabs the shipping weight of the book:
		$("div.content ul li").each(function(i, element) {

	 		if ($(this).children('b').text() === 'Shipping Weight:') {
				resultAsString = $(this).text()
					.replace('Shipping Weight: ','')
					.replace(' pounds (View shipping rates and policies)','');
				resultAsFloat = parseFloat(resultAsString);
				result.shipping_weight = resultAsFloat.toFixed(1);
			}
		});

		// Grabs the isbn-10 number of the book:
		$("div.content ul li").each(function(i, element) {

	 		if ($(this).children('b').text() === 'ISBN-10:') {
				result.isbn10 = $(this).text()
					.replace('ISBN-10: ','');
			}
		});
		resultArray.push(result);
	});
	// Tells us the scrape was successful	
	console.log("Scrape Complete");	
	cb(null, resultArray);
}

module.exports = dataScraper;