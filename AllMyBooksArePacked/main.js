const AmazonExtractor = require('./AmazonExtractor.js');
const Packer = require('./Packer.js');

const amazonExtractor = new AmazonExtractor();
const packer = new Packer();

// Implementation allows for two methods.

// I.) Extract and pack asynchronously as a single service
// 	a.) Extract and Pack individually.
//		- Extractor has a Packer instance
amazonExtractor.getBooks('./data')
	.then((allBooks) => {
		console.log(amazonExtractor.packer.results)
	});

// II.) Use Extractor and Packer as modular services
// 	a.) Extract
// 	b.) Pack Extracted
var books = amazonExtractor.getBooksSync('./data');
var boxed = packer.binPack(books);
console.log(boxed);




