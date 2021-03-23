const mongoose = require('$Modules/Mongoose');
const statuses = {
	todo: 'todo',
	done: 'done'
}
const TaskSchema = new mongoose.Schema({
	description: {
		type: String,
	},
	assignee_id: {
		type: String,
		index: true,
	},
	status: {
		type: String,
		index: true,
		enum: Object.keys(statuses),
		default: statuses.todo,
	},
});

module.exports = mongoose.model('tasks', TaskSchema);
module.exports.statuses = statuses;
