'use strict';
var Promise = require('bluebird');
Promise.promisifyAll(require('fs'));
var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var cheerio = require("cheerio");
var _ = require('lodash');

var boxModel = require('./box/boxModel');
var bookModel = require("./book/bookModel");

let dir='../data/';

var cleanWeight = (str) => {
	let init = str.indexOf(':') + 2;
	let end = str.indexOf('pounds') - 1;
	return parseFloat(str.substring(init,end));
};

var cleanIsbn = (str) => str.substring(9,str.length);

var getDateFromHtml = (file) => {
	return new Promise( (resolve, reject) => {
        let html = await(fs.readFileAsync(dir+file,'utf-8'));
		let $ = cheerio.load(html);
						
		let title = $('title').text();
		let author = $('a[href*="field-author"]').text();
		let shipping_weight = cleanWeight($('b:contains("Shipping Weight:")').parent().text());
		let isbn_10 = cleanIsbn($('b:contains("ISBN-10:")').parent().text());
		
		let newBook = bookModel.Create({
			title: title,
			author: author,
			shipping_weight: shipping_weight,
			isbn_10: isbn_10
		});
		
		resolve(newBook);
    });
};

var getBook = (totalWeight, books) =>{
	if(books.length) 
	{
		let newWeight = totalWeight + books[books.length - 1].shipping_weight;
			
		if(newWeight <= 10)
		{
			let bookToAdd = books.pop();
			return bookToAdd;
		}
		
		newWeight = totalWeight + books[0].shipping_weight;
		
		if(newWeight <= 10)
		{
			let bookToAdd = books.shift();
			return bookToAdd;
		}
	}
	return undefined;
};

var createBoxes = (books) => {
	let result = [];
	let booksSorted = _.sortBy(books, (book) => book.shipping_weight);
	let id = 0;
	while (booksSorted.length) {
		
		let newBox = boxModel.Create({
			id: id,
			totalWeight: 0,
			contents: []
		});
		
		let nextBook = getBook(newBox.totalWeight, booksSorted);
		
		while(nextBook){
			
			newBox.contents.push(nextBook);
			newBox.totalWeight += nextBook.shipping_weight;
			nextBook = getBook(newBox.totalWeight, booksSorted);
			
		}
		
		id++;
		result.push(newBox);
	}
	console.log(result);
};

var readAllFiles = async ( () => {
	let fileNames;
	fileNames = await(fs.readdirAsync(dir));
	
	Promise.map(fileNames, (fileName) => {
	    return getDateFromHtml(fileName);
	}).then( (results) => {
		createBoxes(results);
	});
});

readAllFiles();