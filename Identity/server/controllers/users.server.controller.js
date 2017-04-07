import mongoose from 'mongoose'
import json from '../helpers/json'
import { generateToken } from '../helpers/auth'
import model from '../models/users'


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

			user.comparePassword(req.body.password, (err, isMatch) => {
				if (err) {
					return json.bad(err, res);
				}

				if (isMatch) {
					user.token = generateToken(user);
					user.save((err) => {
						if (err) {
							return json.bad(err, res);
						}

						json.good({
							record: user,
							token: user.token
						}, res)
					});
				}
			});
		});
	};

	obj.changePassword = (req, res) => {
		User.findOne({name: req.params.userName}, (err, user) => {
			if (err) {
				return json.bad(err, res);
			}

			user.comparePassword(req.body.password, (err, isMatch) => {
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
							record: user
						}, res);
					});
				}
			});
		});
	};

	return obj;
}