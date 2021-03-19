const mongoose = require('$Modules/Mongoose');
const User = require('$Models/User')

const SessionSchema = new mongoose.Schema({
	login: {
		type: String,
		index: true,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		index: true,
		unique: true,
		required: true,
	},
	phone: {
		type: String,
		index: true,
		unique: true,
		required: true,
	},
	role: {
		type: String,
		enum: User.roles,
		required: true,
		default: User.roles.developer,
	},
	token: {
		type: String,
		required: true,
		unique: true,
	},
});

module.exports = mongoose.model('session', SessionSchema);
