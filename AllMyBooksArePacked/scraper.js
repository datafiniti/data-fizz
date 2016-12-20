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
		if (i == 0) {
			var el = $(this);
			var author = el.text();
			json.author = author;
		}
	})
	$('span#actualPriceValue').each(function(i, element) {
		var el = $(this);
		var price = el.text();
		json.price = price;
	})
	$('table#productDetailsTable ul li').each(function(i, element) {
		var el = $(this);
		var text = el.text();
		if (text.includes('Shipping Weight: ')){
			var start = text.indexOf(':') + 2;
			var end = text.indexOf('View', start) - 2;
			text = text.substring(start, end);
			json.shippingWeight = text;			
		}
		if (text.includes('ISBN-10: ')){
			json.isbn10 = text.split(': ').pop();	
		}		

	})

	fs.writeFile(json.title + '.json', JSON.stringify(json, null, 4), function(err) {
	})
}
