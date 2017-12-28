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

    let shippingWeight = $("table#productDetailsTable td.bucket div.content li:contains('Shipping Weight')").children().remove().end().text();
    shippingWeight = shippingWeight.substring(1, shippingWeight.indexOf('pounds') + 'pounds'.length);

    let isbn10 = $("table#productDetailsTable td.bucket div.content li:contains('ISBN-10')").children().remove().end().text();
    isbn10 = isbn10.substring(1, isbn10.length);

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