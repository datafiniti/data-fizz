// BDD style testing
const should = require('chai').should();

// classes
const Packer = require('../class_utils/Packer.js');
const AmazonExtractor = require('../class_utils/AmazonBookExtractor.js');
const Box = require('../class_utils/Box.js');
const Book = require('../class_utils/Book.js');

// utils
const _ = require('underscore');
const path = require('path')

describe('Product detail extraction', () => {
  describe('Books', () => {
  	var book;

    before(() => {
    	book = new Book({
    		title: 'Book Title',
    		isbn: '1234567890',
    		weight: '10 pounds',
    		price: '12.00$',
    		author: 'Author McGriffin'
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
  	describe('extraction accuracy', () => {
	  	var book;

		  before((done) => {
		  	var extractor = new AmazonExtractor();
		  	extractor.getBooks('./data')
		  		.then(() => {
		  			book = extractor.extracted[0];
		  			done();
		  		});
		  });

		  	// expected output
		  	// {
			    // title: 'The Ocean at the End of the Lane: A Novel',
			    // 'isbn-10': '0062255657',
			    // price: '$15.22',
			    // shipping_weight: '9.4 pounds',
			    // author: 'Neil Gaiman',
			    // _weight: 9.4 }
			  // }

	    it('should extract the title', () => {
	    	book['title'].should.equal('The Ocean at the End of the Lane: A Novel');
	    });
	    it('should extract the author', () => {
	    	book['author'].should.equal('Neil Gaiman');
	    });
	    it('should extract the price', () => {
	    	book['price'].should.equal('$15.22');
	    });
	    it('should extract the shipping weight', () => {
	    	book['shipping_weight'].should.equal('9.4 pounds');
	    });
	    it('should extract the isbn-10', () => {
	    	book['isbn-10'].should.equal('0062255657');
	    });
	    it('should extract and parse the shipping_weight', () => {
	      book['_weight'].should.equal(9.4);
	    });
	  });
		describe('book extraction', () => {
			var books;
			var book;

			before((done) => {
				var extractor = new AmazonExtractor();
				extractor.getBooks('./data')
					.then(() => {
						books = extractor.extracted;
						book = books[0];
						done();
					});
			});

	    it('should extract into Book instance', () => {
				book.should.be.instanceof(Book);
	    });
	    it('should return extracted books', () => {
	    	book.should.deep.equal(new Book({
		  	  'title': 'The Ocean at the End of the Lane: A Novel',
			    'isbn': '0062255657',
			    'price': '$15.22',
			    'weight': '9.4 pounds',
			    'author': 'Neil Gaiman',
			    '_weight': 9.4 
		  	}));
	    });
	    it('should maintain descending order of extracted books', () => {
	    	var isDescending = (books) => {
	    		return _.reduce(books, (memo, book, i) => {
	    			var prev = books[i - 1] ?
	    				books[i - 1]._weight :
	    				book._weight;
	    			return prev >= book._weight;
	    		}, true);
	    	};

	    	isDescending(books).should.be.true
	    });
	  });
  });
  describe('Packing', () => {
  	var box;
  	var extracted;
  	var packer = new Packer();

  	before((done) => {
  		var extractor = new AmazonExtractor();
  		extractor.getBooks('./data')
  			.then(() => {
  				books = extractor.extracted;
  				box = packer.binPack(books)[0];
  				done();
  			});
  	});

    describe('packing features', () => {
	    it('pack async and should return packaged boxes', () => {
    		box.should.contain.instanceof(Box)
	    });
    });
  });
});