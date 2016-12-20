var fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio');
    dataFolder = './data/';

fs.readdir(dataFolder, (err, files) => {
	files.forEach(file => {
		scrapeBook(dataFolder + file);
	})
})

function scrapeBook(html) {
	var price;
	var json = {
		title: "",
		author: "",
		price: "",
		shippingWeight: "",
		isbn10: ""
	};
	var $ = cheerio.load(fs.readFileSync(html));
	$('span#btAsinTitle').each(function(i, element) {
		var el = $(this);
		var title = el.text();
		json.title = title;
	})
	$('#handleBuy div.buying span a').each(function(i, element) {
		var el = $(this);
		var author = el.text();
		json.author = author;
		console.log(author);
	})

	$('span#actualPriceValue').each(function(i, element) {
		var el = $(this);
		var price = el.text();
		json.price = price;
	})
	$('table#productDetailsTable li').contents().each(function(i, element) {
		var el = $(this);
		var shippingWeight = el.text();
		json.shippingWeight = shippingWeight;
		//console.log($(this))
	})

	fs.writeFile(json.title + '.json', JSON.stringify(json, null, 4), function(err) {
	})
}
