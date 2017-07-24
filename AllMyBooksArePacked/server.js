'use strict';

const StaticServer = require('static-server');
const BookScrapper = require('./src/BookScrapper').BookScrapper;

const server = new StaticServer({
  rootPath: './data/',
  name: 'amazon-books',
  port: 8080,
});

server.start( () => {
  console.log('Server running in: ', server.port);
});

const bs = new BookScrapper();
bs.scrapBooks();
