import mongoose from 'mongoose'
import json from '../helpers/json'

module.exports = () => {
	const User = mongoose.model("User");

	const obj = {};

	obj.create = (req, res) => {
		let roles = ['authenticated'];

		User.count({}, (err, len) => {
			if (!len) {
				roles.push('admin');
			}

			let user = new User(req.body);
			user.roles = roles;
			user.token = 'generateToken';
		})
	}
}