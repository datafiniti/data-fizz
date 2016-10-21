'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const config = require('../config');
const User = require('../models/user');
const uuid = require('uuid');
const PORT = process.env.PORT || 8080;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.NODE_MAILER_FROM.from,
      pass: config.JWT_SECRET
    }
});

const emailOptions = {
	from: '"Datafiniti" <noreply@datafiniti.com>', // sender address
	subject: 'Your Password Reset Is Here ✔', // Subject line
}

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

exports.editPassword = (req, res, next) => {
	// try to find user document by email
	// check if email and password match
	// set login state
	const password = req.body.password;
	const newPassword = req.body.newPassword;
	const passwordResetToken = req.body.passwordResetToken;
  const query = passwordResetToken ? { _id: req.body.userId } : { email: req.body.email };
	User.findOne(query)
		.exec((err, user) => {
			if (err) return next(err);
			if (!user) {
				return res.status(401).send({ error: 'Invalid email or password.' });
			}
      if (passwordResetToken) {
        if (user.passwordResetToken === passwordResetToken) {
          user.password = newPassword;
          user.passwordResetToken = null;
          user.save((err, savedUser) => {
  					if (err) return next(err);
  					return res.json({ token: tokenForUser(savedUser) });
  				});
        } else {
          return res.status(401).send({ error: 'Password reset token is invalid.' });
        }
      } else {
        // ( password attempt, db hash )
        bcrypt.compare(password, user.password, (err, isCorrect) => {
          if (err || !isCorrect) return res.status(401).send(err || { error: 'Invalid password.' });
          user.password = newPassword;
          user.save((err, savedUser) => {
            if (err) return next(err);
            return res.json({ token: tokenForUser(savedUser) });
          });
        });
      }
		});
}

exports.requestPasswordReset = (req, res, next) => {
	// try to find user document by email
	// check if email and password match
	// set login state
	const email = req.body.user.email;
	User.findOne({ email: email })
		.exec((err, user) => {
			if (err) return next(err);
			if (!user) {
				return res.status(401).send({ error: 'Invalid email or password.' });
			}
      user.passwordResetToken = uuid();
      const url = `http://localhost:${PORT}/reset-password/${user._id}/${user.passwordResetToken}`;
      emailOptions.to = user.email;
      emailOptions.text = `Visit this link: ${url} to reset your password.`;
      emailOptions.html = `Visit this link: <a href=${url}>${url}</a> to reset your password.`;
			transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
          return res.status(400).send(error);
        }
        user.save((err, savedUser) => {
    			if (err) return next(err);
          res.json({ passwordResetToken: savedUser.passwordResetToken });
    		});
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
