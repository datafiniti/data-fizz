const AmazonBookExtractor = require('.class_utils/AmazonBookExtractor.js');
const Packer = require('.class_utils/Packer.js');

const packer = new Packer();

// Implementation allows for two methods.

// I.) Extract and pack asynchronously as a single service
// 	a.) Pack extracted in promise
// II.) Use Extractor and Packer as modular services
// 	a.) Extract and send to Packing service
// 	b.) Isolated packing service handles all box generations
const amazonExtractor = new AmazonBookExtractor();
amazonExtractor.getBooks('./data')
	.then(() => {
		console.log(packer.binPack(amazonExtractor.extracted));
		// console.log(packer.getJSON());
	});







