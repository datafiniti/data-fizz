'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define model
const userSchema = new mongoose.Schema({
	email: { type: String, unique: true, lowercase: true },
	name: String,
	phoneNumber: String,
	password: String,
	activeSessions: [ { type: String, expires: '1d' } ],
});

// On save hook aka before saving a user to db, run this function and encrypt password
userSchema.pre('save', function(next) {
	const user = this; // user instance
	if (!user.isModified('password')) {
		return next();
	}
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
