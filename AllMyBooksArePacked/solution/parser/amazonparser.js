var Parser = require('./parser'),
	inherits = require('util').inherits,
	params = require('./parameters.json');

function AmazonParser() {

	Parser.call(this);

	//use the parameters.json file to define what (and how) to search.
	//TODO: generate parser object during run time based on the config
	//amazon generic
	this.contentTablePath = params.AmazonPage.prod_content_table.path;
	this.pricePath = params.AmazonPage.prod_price.path;
	this.weightPath = params.AmazonPage.prod_shipping_weight.path;
	this.namePath = params.AmazonPage.prod_name.path;

	//Book product specific.
	this.authorPath = params.AmazonPage.ProductBook.author.path;
	this.publisherPath = params.AmazonPage.ProductBook.publisher.path;
	this.languagePath = params.AmazonPage.ProductBook.language.path;
	this.pagesPath = params.AmazonPage.ProductBook.pages.path;
	this.isbn10path = params.AmazonPage.ProductBook.isbn10.path;
	this.isbn13path = params.AmazonPage.ProductBook.isbn13.path;

	this.parsePath = function () {
		this._getHtml(this.path);
		this._amazonParse();
	};

	this._amazonParse = function () {
		this.contentTable = this.$(this.contentTablePath);
		//create "pseudo product" object from list
		this.pseudoProduct['name'] = this._getName();
		this.pseudoProduct['price'] = this._getPrice();
		this.pseudoProduct['publisher'] = this._getPublisher()[2];
		this.pseudoProduct['publishDate'] = this._getPublisher()[4];
		this.pseudoProduct['language'] = this._getLanguage();
		this.pseudoProduct['isbn10'] = this._getISBN10();
		this.pseudoProduct['isbn13'] = this._getISBN13();
		this.pseudoProduct['pages'] = this._getPages();
		this.pseudoProduct['weight'] = this._getWeight();
		this.pseudoProduct['author'] = this._getAuthor();
	};

	this._getName = function(){
		return this.$(this.namePath).text();
	}

	this._getLanguage = function(){
		return this.$(this.languagePath, this.contentTable.html()).text().replace("Language: ","");
	};

	this._getPrice = function(){
		return this.$(this.pricePath).text().replace("$", "");
	};

	this._getISBN10 = function(){
		return this.$(this.isbn10path, this.contentTable.html()).text().replace("ISBN-10: ", "");
	};

	this._getISBN13 = function(){
		return this.$(this.isbn13path, this.contentTable.html()).text().replace("ISBN-13: ", "");
	};

	this._getAuthor = function(){
		return this.$(this.authorPath).prev().html();
	};

	//some extra logic needed for these.
	//TODO: refactor

	this._getWeight = function(){
		var w = this.$(this.weightPath, this.contentTable.html()).text();
		var re = new RegExp("(Shipping\\sWeight:\\s)(\\d+\\S*)(\\s\\w*)")
		var results = re.exec(w);
		if (results === null){
			results = ["",""];
		}
		return results[2];
	}

	this._getPublisher = function(){
		var pub = this.$(this.publisherPath, this.contentTable.html()).text();
		var re = new RegExp("(.*Publisher:\\s)(.*)(\\s\\()(.+)(\\))");
		var results = re.exec(pub);
		if (results === null){
			results = ["",""]
		}
		return results;
	};

	this._getPages = function(){
		var pages = this.$(this.pagesPath, this.contentTable.html()).text();
		var re = new RegExp("(.*\\s)(\\d+)");
		var results = re.exec(pages);
		if (results === null){
			results = ["",""]
		}
		return results[2];
	}

}

inherits(AmazonParser, Parser)

module.exports = AmazonParser
