'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define model
const userSchema = new mongoose.Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String,
});

// On save hook aka before saving a user to db, run this function and encrypt password
userSchema.pre('save', function(next) {
	const user = this; // user instance
	bcrypt.hash(user.password, 12, (err, hash) => {
		if (err) return next(err);
		user.password = hash; // overwrite plain text pw with encrypted pw
		next();
	});
});

// Create model class
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;