const mongoose = require('$Modules/Mongoose');

const PerformerSchema = new mongoose.Schema({
	login: {
		type: String,
		index: true,
		unique: true,
		required: true,
	},
	id: {
		type: String,
		index: true,
		unique: true,
		required: true,
	}
});

module.exports = mongoose.model('performers', PerformerSchema);
