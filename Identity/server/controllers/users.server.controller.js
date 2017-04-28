import mongoose from 'mongoose'
import json from '../helpers/json'
import { generateToken, decodeToken } from '../helpers/auth'
import model from '../models/users'
import jwt from 'jsonwebtoken'


module.exports = () => {
	const User = model.User;

	const obj = {};

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

	obj.notifications = (req, res) => {
		User.findOne({_id: req.params.userId})
		.lean()
		.populate('notifications')
		.exec((err, user) => {
			if (err) {
				return json.bad(err, res);
			}

			if (!user.notifications.length) {
				return json.good({
					message: 'You have no unread notifications',
				}, res);
			}

			user.notifications = user.notifications.filter((item) => {
				return item.unread;
			});

			return json.good({
				record: user,
				notifications: user.notifications.slice(0, 10),
			}, res);
		});
	};

	obj.markRead = (req, res) => {
		let notificationIds = [];
		User.findOne({_id: req.params.userId})
		.populate('notifications')
		.exec((err, user) => {
			if (err) {
				return json.bad(err, res);
			}

			for (let i in req.body) {
				notificationIds.push(req.body[i]._id);
			}

			user.notifications.forEach((item) => {
				if (notificationIds.includes(item._id.toString())) {
					item.unread = false;
				}
			});

			user.save(() => {
				user.notifications.filter((item) => {
					return item.unread;
				});

				return json.good({
					notifications: user.notifications.slice(0, 10),
				}, res);
			});
		});
	};


	return obj;
}