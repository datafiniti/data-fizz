// BDD style testing
const should = require('chai').should();

// classes
const Packer = require('./Packer.js');
const AmazonExtractor = require('./AmazonExtractor.js');
const Box = require('./Box.js');
const Book = require('./Book.js');

describe('Product detail extraction', function() {
  describe('Books', function() {
  	var book;

    before(() => {
    	book = new Book({
    		title: 'hi'
    	});
    });

    it('it should have title property', function() {
      book.should.have.property('title');
    });
    it('it should have shipping_weight property', function() {
      book.should.have.property('shipping_weight');
    });
    it('it should have author property', function() {
      book.should.have.property('author');
    });
    it('it should have isbn-10 property', function() {
      book.should.have.property('isbn-10');
    });
    it('it should have price property', function() {
      book.should.have.property('price');
    });
    it('it should have _weight property', function() {
      book.should.have.property('_weight');
    });
  });
  describe('Boxes', function() {
		var box;

	  before(() => {
	  	box = new Box();
	  });

	  it('it should have contents property', function() {
	    box.should.have.property('_contents');
	  });
	  it('it should have totalWeight property', function() {
	    box.should.have.property('totalWeight');
	  });
	  it('it should have id property', function() {
	    box.should.have.property('_id');
	  });
	});
  describe('Extraction', function() {
  	var extractor = new AmazonExtractor();

	  before(() => {
	  	extractor = new AmazonExtractor();
	  });

    it('should extract the title', function() {

    });
    it('should extract the author', function() {

    });
    it('should extract the price', function() {

    });
    it('should extract the weight', function() {

    });
    it('should extract the isbn-10', function() {

    });
    it('should extract and parse the shipping_weight', function() {

    });
    it('should extract synchronously', function() {

    });
    it('should extract asynchronously', function() {

    });
    it('should return extracted books', function() {

    });
    it('should maintain descending order of extracted books', function() {

    });   
  });
  describe('Packing', function() {
    it('should pack synchronously', function() {
    	
    });
    it('should pack asynchronously', function() {
    	
    });
    it('should return packaged boxes', function() {
    	
    });
    it('should pack in polynomial time', function() {
    	
    });
  });
});