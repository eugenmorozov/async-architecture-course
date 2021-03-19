const Task = require('$Models/Task')
const { omit } = require('lodash');
module.exports = async (ctx, next) => {
	const { task_id: taskID } = ctx.request.body;
	if(!taskID){
		throw new Error('Параметр task_id обязателен');
	}
	const task = await Task.findOne({
		_id: taskID,
	});
	if (!task){
		throw new Error('Задача не найдена');
	}

	if (task.status !== Task.statuses.done){
		throw new Error('Задача уже открыта');
	}

	task.status = Task.statuses.todo;
	await task.save();

	ctx.body = {
		...omit(task.toObject(),['__v', '_id'])
	}
}
