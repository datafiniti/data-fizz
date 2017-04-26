import jwt from 'jsonwebtoken'

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
