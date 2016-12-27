var fs = require('fs');
var scraper = require('./scrapeToJson.js');

exports.scrapeHtmlToJson = function(inputDir, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    fs.readdir(inputDir, (err, files) => {
        files.forEach(file => {
            var json = scraper.scrapeToJson(inputDir + file);
            var filename = file.split('.html').shift() + '.json';
            fs.writeFile(outputDir + filename, JSON.stringify(json, null, 4), function(err) {});
        })
    })
}