import mongoose from 'mongoose'
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
		required: true,
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

UserSchema.pre('save', function(next) {
	let user = this;

	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});

UserSchema.methods = {
	hasRole: (role) => {
		this.roles.includes('admin') || this.roles.includes(role);
	},

	comparePassword: function(candidatePassword, cb) {
		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
			if (err) {
				return cb(err);
			}

			cb(null, isMatch);
		});
	},

	toJSON: function() {
		let obj = this.toObject();
		obj.password = '';
		return obj;
	}
};

const User = mongoose.model('User', UserSchema);

module.exports = {
	User: User
};

