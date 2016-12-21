var fs = require('fs');
var bookScraper = require('./bookToJson.js')

var dataFolder = './data/';

fs.readdir(dataFolder, (err, files) => {
	files.forEach(file => {
		var json = bookScraper.htmlToJson(dataFolder + file);
		fs.writeFile('./jsonData/' + json.title + '.json', JSON.stringify(json, null, 4), function(err) {});
	})
})