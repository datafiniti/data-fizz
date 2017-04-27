import jwt from 'jsonwebtoken'
import model from '../models/users';
import json from './json';

export function generateToken(obj) {
	let today = new Date();
	let exp = new Date(today);
	exp.setDate(today.getDate() + 2);

	return jwt.sign({
		user: obj,
		exp: parseInt(exp.getTime() / 1000)
	}, global.config.secret);
}

export function decodeToken(token) {
	const decoded = jwt.verify(token, global.config.secret);
	const requestedUser = decoded.user._id;

	return requestedUser;
}

export function ensureAuthorized (req, res, next) {
	const User = model.User;
	const bearerHeader = req.headers['authorization'];

	let bearerToken;

	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(" ");
		bearerToken = bearer[1];

		try {
			const decoded = jwt.verify(bearerToken, global.config.secret,
				(err, decoded) => {
					if (err && err.name == 'TokenExpiredError') {
						return json.bad({
							message: 'Sorry, your login session has expired. Please login again',
						}, res);
					}

					User.findOne({_id: decoded.user._id})
					.exec((err, user) => {
						if (err || !user) {
							return res.sendStatus(403);
						}

						req.user = user;
						next();
					});
				}
			);
		} catch (err) {
			res.sendStatus(403);
		}
	} else {
		res.sendStatus(403);
	}
}