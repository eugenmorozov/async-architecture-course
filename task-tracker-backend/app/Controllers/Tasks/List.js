const Task = require('$Models/Task')
const { omit } = require('lodash');
module.exports = async (ctx, next) => {
	const tasks = await Task.find({});


	ctx.body = {
		tasks: tasks.map(task => omit(task.toObject(),['__v'])),
	}
}
