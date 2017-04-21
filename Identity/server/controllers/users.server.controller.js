import mongoose from 'mongoose'
import json from '../helpers/json'
import { generateToken, decodeToken } from '../helpers/auth'
import model from '../models/users'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import async from 'async'


module.exports = () => {
	const User = model.User;

	const obj = {};

	obj.create = (req, res) => {
		let roles = ['authenticated'];

		User.count({}, (err, len) => {
			if (!len) {
				roles.push('admin');
			}

			let user = new User(req.body);
			user.roles = roles;
			user.token = generateToken(user);
			user.lastLogin = Date.now();
			user.loggedIn = true;

			user.save((err) => {
				if (err) {
					return json.bad(err, res);
				}

				json.good({
					record: user,
					token: user.token
				}, res);
			});
		});
	};

	obj.authenticate = (req, res) => {
		User.findOne({email: req.body.email}, (err, user) => {
			if (err) {
				return json.bad(err, res);
			}

			if (!user) {
				return json.bad({message: 'Sorry, there was no user with that email/password combination'}, res);
			}


			if (user.isLocked) {
				return user.incorrectLoginAttempts((err) => {
					if (err) {
						return json.bad(err, res);
					}

					json.bad({message: `Sorry, your have reached the maximum number of login attempts and your account has been locked until ${user.lockUntil}`}, res);
				})
			}

			if (user.secureLock) {
				return json.bad({message: 'Sorry, you account has been permenantly locked due to excessive attempts at logging into your account. Please contact the staff to sort this out'}, res);
			}

			user.comparePassword(req.body.password, (err, isMatch) => {
				if (err) {
					return json.bad(err, res);
				}

				if (isMatch) {
					if (!user.loginAttempts && !user.lockUntil
						 && !user.secureLock) {

						user.token = generateToken(user);
						user.lastLogin = Date.now();
						user.loggedIn = true;

						return user.save((err) => {
							json.good({
								record: user,
								token: user.token,
							}, res);
						});	
					}

					let updates = {
						$set: {
							loginAttempts: 0,
							limitReached: 0,
						},

						$unset: { lockUntil: 1 }
					};

					return user.update(updates, (err, item) => {
						user.token = generateToken(user);
						user.lastLogin = Date.now();
						user.loggedIn = true;
						
						if (err) {
							return json.bad(err, res);
						}

						user.save((err) => {
							return json.good({
								record: user,
								token: user.token,
							}, res);
						});
					});
				}

				user.incorrectLoginAttempts((err) => {
					let totalAttempts;

					if (err) {
						return json.bad(err, res);
					}

					if (user.limitReached >= 2) {
						totalAttempts = 3;
					} else {
						totalAttempts = 5;
					}

					json.bad({message: `Sorry, either your email or password were incorrect. You have ${totalAttempts - user.loginAttempts} remaining until your account is locked`}, res);
				});
			});
		});
	};

	obj.changePassword = (req, res) => {
		User.findOne({email: req.params.email}, (err, user) => {
			
			if (err) {
				return json.bad(err, res);
			}

			user.comparePassword(req.body.oldPassword, (err, isMatch) => {
				if (err) {
					return json.bad(err, res);
				}

				if (isMatch) {
					user.password = req.body.newPassword;
					user.token = '';
					user.token = generateToken(user);

					user.save((err) => {
						if (err) {
							return json.bad(err, res);
						}

						json.good({
							record: user,
							token: user.token,
						}, res);
					});
				}
			});
		});
	};

	obj.editUser = (req, res) => {
		console.log(req);
		User.findOne({email: req.params.email}, (err, user) => {
			if (err) {
				return json.bad(err, res);
			}

			user.name = req.body.name || user.name;
			user.username = req.body.username || user.username;
			user.email = req.body.email || user.email;
			user.save((err) => {
				if (err) {
					return json.bad(err, res);
				}

				json.good({
					record: user,
				}, res);
			});
		});
	};

	obj.meFromToken = (req, res) => {
		let token = req.params.token || req.body.token;

		if (!token) {
			return json.bad({
				message: 'Must send a token',
			}, res);
		}

		User.findOne({
			_id: decoded.user._id,
		}, (err, user) => {
			if (err) {
				return json.bad(err, res);
			}

			user.save((err) => {
				if (err) {
					return json.bad(err, res);
				}

				json.good({
					record: user,
					token: user.token,
				}, res);
			}); 
		});
	};

	obj.logout = (req, res) => {
		User.findOne({_id: req.params.userId}, (err, user) => {
			if (err) {
				return json.bad(err, res);
			}

			user.loggedIn = false;
			user.token = null;

			user.save((err) => {
				if (err) {
					return json.bad(err, res);
				}

				json.good({
					record: user,
				}, res);
			});
		});
	};

	obj.forgot = (req, res) => {
		async.waterfaller([
			function(done) {
				crypto.randomBytes(20, (err, buf) => {
					const token = buf.toString('hex');
					done(err, token);
				});
			},

			function (token, done) {
				User.findOne({email: req.body.email}, (err, user) => {
					if (err) {
						return json.bad(err, res);
					}

					user.resetPasswordToken = token;
					user.resetPasswordExpires = Date.now() + 3600000;
					user.save((err) => {
						done(err, token, user);
					});
				});
			},

			function (token, user, done) {
				/* let emailTemplate = fs.readFileSync('./server/templates/emailtemplate.html', {encoding: 'utf-8'});
				   let template = handlebars.compile(emailTemplate);
				   let replacements = {
						token: user.resetPasswordToken,
				   };
				   let templateToSend = template(replacements);
				*/

				let mailTransport = nodemailer.createTransport({
					service: global.config.mailer.service,
					auth: {
						user: global.config.mailer.auth.user,
						pass: global.config.mailer.auth.pass,
					},
				});

				let mailOptions = {
					to: user.email,
					from: 'Identity',
					subject: 'Your password Reset',
					text: 'yay'
				};

				mailTransport.sendMail(mailOptions, (error, info) => {
					if (error) {
						json.bad(error, res);
					} else {
						json.good(info.response, res);
					}
				});
			}
		], (err) => {
			let success = true;

			if (err) {
				return json.bad(err, res);
			}

			json.good({
				record: success,
			}, res);
		});
	};

	obj.reset = (req, res) => {
		User.findOne({resetPasswordToken: req.body.token}, (err, user) => {
			if (err) {
				return json.bad(err, res);
			}

			user.password = req.body.password;
			user.resetPasswordToken = undefined;
			user.resetPasswordExpires = undefined;
			user.save((err) => {
				if (err) {
					return json.bad(err, res);
				}

				json.good({
					record: user,
				}, res);
			});
		});
	};


	return obj;
}