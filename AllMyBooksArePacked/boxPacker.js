var fs = require('fs');
var dataFolder = './jsonData/';

var obj;
fs.readdir(dataFolder, (err, files) => {
	files.forEach(file => {
		fs.readFile(dataFolder + file, 'utf8', function (err, data) {
			if (err) throw err;
			obj = JSON.parse(data);
			console.log (obj);
		})
	})
})