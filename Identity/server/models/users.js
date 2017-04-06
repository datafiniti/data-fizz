import mongoose 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},

	name: {
		type: String,
		required: true
	},

	username: {
		type: String,
		unique: true,
		match: [/\w+$/, 'Please enter only alphanumeric characters']
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	},

	picture: {
		type: String
	},

	roles: {
		type: Array,
		default: ['authenticated']
	},

	loggedIn: {
		type: Boolean,
		default: false
	},

	token: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

UserSchema.methods = {

};

mongoose.model('User', UserSchema);