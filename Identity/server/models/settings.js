import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now(),
	},

	twoFactorAuth: {
		type: Boolean,
		default: false,
	},

	textAuthentication: {
		type: Boolean,
		default: false,
	},

	creator: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

SettingsSchema.methods = {
	toJSON: function() {
		let obj = this.toObject();

		if (obj.creator) {
			obj.creator.password = '';
		}

		return obj;
	},
};

const Settings = mongoose.model('Settings', SettingsSchema);

module.exports = {
	Settings: Settings,
};