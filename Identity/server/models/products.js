import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now(),
	},

	name: {
		type: String,
		required: true,
	},

	status: {
		type: String,
	},

	number: {
		type: Number,
		required: true,
	},

	inStock: {
		type: Boolean,
		default: true,
	},

	sold: {
		type: Number,
		default: 0,
	},

	price: {
		type: Number,
	},

	category: {
		type: mongoose.Schema.ObjectId,
		ref: 'Category',
		required: true,
	}
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = {
	Product: Product,
};