const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load();

// Constuctor for making boxes

// json variable that will be used as the output
const boxJSON = {}

// Filesystem code that will be doing the scraping
const readMe = fs.readFileSync('./data/book1.html', 'utf8');


// Output file that will be the raw json of the boxes
fs.writeFileSync('Output.json');
