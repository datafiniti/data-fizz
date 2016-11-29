// BDD style testing
const should = require('chai').should();

// classes
const Packer = require('../Packer.js');
const AmazonExtractor = require('../AmazonExtractor.js');
const Box = require('../Box.js');
const Book = require('../Book.js');

// utils
const _ = require('underscore');
const path = require('path')

describe('Product detail extraction', () => {
  describe('Books', () => {
  	var book;

    before(() => {
    	book = new Book({
    		title: 'hi'
    	});
    });

    it('it should have title property', () => {
      book.should.have.property('title');
    });
    it('it should have shipping_weight property', () => {
      book.should.have.property('shipping_weight');
    });
    it('it should have author property', () => {
      book.should.have.property('author');
    });
    it('it should have isbn-10 property', () => {
      book.should.have.property('isbn-10');
    });
    it('it should have price property', () => {
      book.should.have.property('price');
    });
    it('it should have _weight property', () => {
      book.should.have.property('_weight');
    });
  });
  describe('Boxes', () => {
		var box;

	  before(() => {
	  	box = new Box();
	  });

	  it('it should have contents property', () => {
	    box.should.have.property('_contents');
	  });
	  it('it should have totalWeight property', () => {
	    box.should.have.property('totalWeight');
	  });
	  it('it should have id property', () => {
	    box.should.have.property('_id');
	  });
	});
  describe('Extraction', () => {
  	var book;
  	describe('extraction accuracy', () => {
		  before(() => {
		  	var extractor = new AmazonExtractor();
		  	book = extractor.getBooksSync('./tests/testHtml')[0];

		  	// expected output
		  	// {
		  	//   title: 'Zealot: The Life and Times of Jesus of Nazareth',
		  	//   'isbn-10': '140006922X',
		  	//   price: '$16.89',
		  	//   shipping_weight: '1.2 pounds',
		  	//   author: 'Reza Aslan',
		  	//   _weight: 1.2 
		  	// }
		  });

	    it('should extract the title', () => {
	    	book['title'].should.equal('Zealot: The Life and Times of Jesus of Nazareth');
	    });
	    it('should extract the author', () => {
	    	book['author'].should.equal('Reza Aslan');
	    });
	    it('should extract the price', () => {
	    	book['price'].should.equal('$16.89');
	    });
	    it('should extract the shipping weight', () => {
	    	book['shipping_weight'].should.equal('1.2 pounds');
	    });
	    it('should extract the isbn-10', () => {
	    	book['isbn-10'].should.equal('140006922X');
	    });
	    it('should extract and parse the shipping_weight', () => {
	      book['_weight'].should.equal(1.2);
	    });
	  });
		describe('synchronous extraction', () => {
			var extractor;
			var books;
			var book;

			before(() => {
				extractor = new AmazonExtractor();
			});

	    it('should extract synchronously', () => {
				books = extractor.getBooksSync('./tests/testHtml');
				console.log(books);
				book = books[0];
				book.should.be.instanceof(Book);
	    });
	    it('should return extracted books', () => {
	    	book.should.deep.equal(new Book({
		  	  'title': 'Zealot: The Life and Times of Jesus of Nazareth',
		  	  'isbn': '140006922X',
		  	  'price': '$16.89',
		  	  'weight': '1.2 pounds',
		  	  'author': 'Reza Aslan',
		  	  '_weight': 1.2 
		  	}));
	    });
	    it('should maintain descending order of extracted books', () => {
	    	var isDescending = (books) => {
	    		var prev = books[0]._weight;

	    		return _.reduce(books, (memo, book, i) => {
	    			if (books[i - 1])
	    				prev = books[i - 1];
	    			return prev >= book._weight;
	    		}, true);
	    	};

	    	isDescending(books).should.be.true
	    });
    });
    describe('asynchronous extraction', () => {   
	    var extractor = new AmazonExtractor();
	    var promise;

	    before(() => {
	    	promise = extractor.getBooks('./tests/testHtml');

	    });

	    it('should extract asynchronously', () => {
	    	promise.then(() => {
	    		var book  = extractor.packer.results[0]._contents[0];
	    		book.should.be.instanceof(Book);
	    	})
	    });
	  });
  });
  describe('Packing', () => {
    describe('packing features', () => {
    	var extractor;
    	var promise;

    	before(() => {
    		extractor = new AmazonExtractor();
    		promise = extractor.getBooks('./tests/testHtml');
    	});
	    it('should return packaged boxes', () => {
	    	promise.then(() => {
	    		extractor.packer.results[0].should.contain.instanceof(Box)
	    	});
	    });
    });
    describe('asynchronous packing', () => {
    	var extractor;

    	before(() => {
    		extractor = new AmazonExtractor();
    	});

	    it('should pack asynchronously', () => {
	    	extractor.getBooks('./tests/testHtml')
	    		.then(() => {
	    			extractor.packer.results[0].should.be.instanceof(Box);
	    		});
	    });
	  });
	  describe('synchronous packing', () => {
	  	var packer;
	  	var extractor;

	  	before(() => {
	  		extractor = new AmazonExtractor();
	  		packer = new Packer();
	  	});

    	it('should pack synchronously', () => {
        	var books = extractor.getBooksSync('./tests/testHtml');
        	packer.binPack(books)[0].should.be.instanceof(Box);
      });
	  });
  });
});