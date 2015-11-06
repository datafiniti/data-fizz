var fs = require('fs');
var cheerio = require('cheerio');
//var request = require('request');

function Parser() {
	this.isLocal = false;
	this.raw;
	this.path;
	this.$;
	this.keywords = [];
	this.pseudoProduct = {};

	this._getHtml = function (path) {
		if (this.isLocal) {
			this._getLocalFile(path);
		} else {
			this._getUrl(path);
		}
	};

	this._getLocalFile = function (path) {
		var content = fs.readFileSync(path);
		this.raw = content;
		this.$ = cheerio.load(this.raw);
	};

	this._getUrl = function (url) {
		//get html
	};

}

module.exports = Parser
