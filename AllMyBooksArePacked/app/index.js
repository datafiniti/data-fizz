const cheerio = require('cheerio');
const fs      = require('fs');

let html = fs.readFileSync('../data/book1.html');
const $ = cheerio.load(html);

var data = {};

data.title = $('#btAsinTitle').text();
console.log('data:', data);
