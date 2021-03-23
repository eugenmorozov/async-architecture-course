const mongoose = require('$Modules/Mongoose');

const TaskSchema = new mongoose.Schema({
	description: {
		type: String,
	},
	assignee_id: {
		type: String,
		index: true,
	},
	cost: {
		type: Number
	},
	reward: {
		type: Number
	},
});

module.exports = mongoose.model('tasks', TaskSchema);
