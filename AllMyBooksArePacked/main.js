const AmazonExtractor = require('./AmazonExtractor.js');
const Packer = require('./Packer.js');

const packer = new Packer();

// Implementation allows for two methods.

// I.) Extract and pack asynchronously as a single service
// 	a.) Extract and Pack individually.
//		- Extractor has a Packer instance
const amazonExtractor = new AmazonExtractor();
amazonExtractor.extractAndPack('./data')
	.then(() => {
		console.log(amazonExtractor.packer.results)
	});

// II.) Use Extractor and Packer as modular services
// 	a.) Extract
// 	b.) Pack Extracted
const amazonExtractor2 = new AmazonExtractor();
amazonExtractor2.getBooks('./data')
	.then(() => {
		console.log(packer.binPack(amazonExtractor2.extracted));
	});






