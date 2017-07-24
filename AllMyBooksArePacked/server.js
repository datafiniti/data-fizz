'use strict';

const StaticServer = require('static-server');
const BookScrapper = require('./src/BookScrapper').BookScrapper;
const BookBoxPacker = require('./src/BookBoxPacker').BookBoxPacker;

const maxBoxWeightInPounds = require('./config/config.js').maxBoxWeightInPounds;

const server = new StaticServer({
	rootPath: './data/',
	name: 'amazon-books',
	port: 8080,
});

server.start( () => {
	console.log('Server running in: ', server.port);
});


/*
	Leaving this logic here for easier testing.
	It can easily be moved somewhere else in case it needs to be used on an api
	endpoint or elsewhere.
	 */
const bs = new BookScrapper();
bs.scrapBooks()
	.then((books) => {
		const bookPacker = new BookBoxPacker(maxBoxWeightInPounds);
		let boxes = bookPacker.packBooks(books);
		console.log(JSON.stringify(boxes, null, 2));
	},
	console.error);
