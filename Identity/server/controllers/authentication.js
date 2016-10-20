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
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
	const origin = req.headers.origin;
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
		const activeSessions = [ origin ];
    const user = new User({
      email: email,
      password: password,
			activeSessions: activeSessions,
			name: name,
			phoneNumber: phoneNumber,
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
	const origin = req.headers.origin;
	User.findOne({ email: email })
		.exec((err, user) => {
			if (err) return next(err);
			if (!user) {
				return res.status(401).send({ error: 'Invalid email or password.' });
			}
			// ( password attempt, db hash )
			bcrypt.compare(password, user.password, (err, isCorrect) => {
				if (err || !isCorrect) return res.status(401).send(err || { error: 'Invalid email or password.' });
				user.activeSessions.push(origin);
				user.save((err, savedUser) => {
					if (err) return next(err);
					res.json({ token: tokenForUser(savedUser) });
				})
			});
		});
}

exports.signout = (req, res, next) => {
	const userId = req.body.userId;
	const origin = req.headers.origin;
	User.findOne({ _id: userId }, (err, existingUser) => {
		if (err) return next(err);
		const index = existingUser.activeSessions.indexOf(origin);
		existingUser.activeSessions.splice(index, 1);
		existingUser.save((err, savedUser) => {
			if (err) return next(err);
			res.json({ message: `Success - user with ID ${savedUser._id} signed out.` });
		});
	});
}

exports.authorize = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).send({ error: 'Missing authorization header.' });
	}
	jwt.verify(token, config.JWT_SECRET, (err, payload) => {
		if (err) return res.status(401).send(err);
		User.findById(payload._id, (err, user) => {
			if (err || !user) return res.status(401).send(err || { error: 'User not found.' });
			req.user = user;
			next();
		}).select('-password');
	});
}
