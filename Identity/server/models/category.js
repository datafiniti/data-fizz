import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now(),
	},

	name: {
		type: String,
		required: true,
	},

	products: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Products',
		required: false,
	}],
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = {
	Category: Category,
};

