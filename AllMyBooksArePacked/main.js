const AmazonExtractor = require('./AmazonExtractor.js');
const Packer = require('./Packer.js');

var amazonExtractor = new AmazonExtractor();
var packer = new Packer();

// Implementation allows for two methods.

// I.) Extract and pack asynchronously as a single service
// 	a.) Extract and Pack individually.
//		- Extractor has a Packer instance
amazonExtractor.getBooks('./data')
	.then((allBooks) => {
		var packer = amazonExtractor.getPacker();
		console.log(packer.getResult());
	});

// II.) Use Extractor and Packer as modular services
// 	a.) Extract
// 	b.) Pack Extracted


// Pack all the books away



