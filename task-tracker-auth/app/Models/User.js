const mongoose = require('$Modules/Mongoose');
const roles = {
	developer: 'developer',
	manager: 'manager',
	admin: 'admin',
	accountant: 'accountant'
}

const UserSchema = new mongoose.Schema({
	login: {
		type: String,
		index: true,
		unique: true,
		required: true,
	},
	password: {
		type: String,
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
		enum: Object.keys(roles),
		required: true,
		default: roles.developer
	},
});

module.exports = mongoose.model('users', UserSchema);
module.exports.roles = roles;
