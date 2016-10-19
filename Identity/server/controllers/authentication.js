'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
	const payload = { _id: user._id };
	const options = { expiresIn: '1 day' };
	const token = jwt.sign(payload, config.JWT_SECRET, options);
  return token;
}

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // See if email and password were passed in the req.body
  if (!email | !password) {
    return res.status(422).send({ error: 'You must provide your email and password' });
  }
  // See if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);
    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use' });
    }
    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password,
    });
    user.save((err, savedUser) => {
      if (err) return next(err);
      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(savedUser) });
    });
  });
}

exports.signin = (req, res, next) => {
	// try to find user document by email
	// check if email and password match
	// set login state
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email })
		.exec((err, user) => {
			if (err) return next(err);

			if (!user) {
				return res.status(401).send({ error: 'Invalid email or password.' });
			}
			// ( password attempt, db hash )
			bcrypt.compare(password, user.password, (err, isCorrect) => {
				if (err || !isCorrect) return res.status(401).send(err || { error: 'Invalid email or password.' });
				res.json({ token: tokenForUser(user) });
			});
		});
};

exports.authorize = (req, res, next) => {
	const tokenHeader = req.headers.authorization;
	if (!tokenHeader) {
		return res.status(401).send({ error: 'Missing authorization header.' });
	}
	const token = tokenHeader.split(' ')[1];
	jwt.verify(token, config.JWT_SECRET, (err, payload) => {
		if (err) return res.status(401).send(err);
		User.findById(payload._id, (err, user) => {
			if (err || !user) return res.status(401).send(err || { error: 'User not found.' });
			req.user = user;
			next();
		}).select('-password');
	});
}
