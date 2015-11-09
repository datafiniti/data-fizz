'use strict';
var Promisebb = require('bluebird');
Promisebb.promisifyAll(require('fs'));
var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var cheerio = require("cheerio");

var boxModel = require('./box/boxModel');
var bookModel = require("./book/bookModel");

let dir='../data/';

let newBoxes = [];
let newBoxs = [];
let books = [];

var getDateFromHtml = (file) => {
	let html = await(fs.readFileAsync(dir+file,'utf-8'));
	let $ = cheerio.load(html);
					
	let title = $('title').text();
	let author = $('a[href*="field-author"]').text();
	let shipping_weight = $('b:contains("Shipping Weight:")').parent().html()
	let isbn_10 = $('a[href*="field-author"]').parent().html()
	
	let newBook = bookModel.Create({
		title: title,
		author: author,
		shipping_weight: shipping_weight,
		isbn_10: isbn_10
	});
	
	books.push(newBook);
	console.log(newBook);
};

var readAllFiles = async ( () => {
		let files;
		files = await(fs.readdirAsync(dir));
		files.forEach( (file) => getDateFromHtml(file) );
});

readAllFiles();

console.log('test');