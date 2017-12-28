'use strict';
const cheerio = require('cheerio');

const parseHtml = (html) => {
	const $ = cheerio.load(html);
	const title = $('span#btAsinTitle').text();
    let price = $('b.priceLarge').text();
    price = price !== '' ? price : $('td.buyNewOffers span.rentPrice').text();
	const author = $("span:contains('(Author)') a").map(function() {
        return $(this).text();
    }).get().join(', ');
	const shippingWeight = $("table#productDetailsTable td.bucket div.content li:contains('Shipping Weight')").children().remove().end().text();
	const isbn10 = $("table#productDetailsTable td.bucket div.content li:contains('ISBN-10')").children().remove().end().text();
    return {
        title,
        price,
        author,
		shippingWeight,
		isbn10
    }
};

module.exports = {
    parseHtml
};