var scrapeHtmlDir = require('./app/scrapeHtmlDir.js');
var packBoxes = require('./app/packBoxes.js');

// inputs for challenge
var dataDir = './data/';
var jsonDir = './jsonData/';
var query = 'shippingWeight';
var maxWeightPerBox = 10;

// dataDir contains should contain html files, jsonDir is the output from scraping the html files.
// query can scrape the html file for different info (I have provided the code for Amazon books).
// maxWeightPerBox determines the maximum weight allowed in a box for shipping.

scrapeHtmlDir.scrapeHtmlToJson(dataDir, jsonDir);
packBoxes.packBoxes(jsonDir, query, maxWeightPerBox);