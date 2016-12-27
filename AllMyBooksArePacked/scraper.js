var fs = require('fs');
var bookScraper = require('./bookToJson.js')

var dataDir = './data/';
var jsonDir = './jsonData/';

if (!fs.existsSync(jsonDir)){
    fs.mkdirSync(jsonDir);
}

fs.readdir(dataDir, (err, files) => {
	files.forEach(file => {
		var json = bookScraper.htmlToJson(dataDir + file);
        var filename = file.split('.html').shift() + '.json';
		fs.writeFile(jsonDir + filename, JSON.stringify(json, null, 4), function(err) {});
	})
})