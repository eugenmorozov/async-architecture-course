const Task = require('$Models/Task')
const { omit } = require('lodash');
const { sendEvent } = require('$Modules/MB');

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

	if (task.status !== Task.statuses.todo){
		throw new Error('Задача уже закрыта');
	}

	task.status = Task.statuses.done;
	await task.save();

	await sendEvent('tasks', 'TaskClosed', {
		id: taskID,
		description: task.description,
		assignee_id: task.assignee_id,
	});
	ctx.body = {
		...omit(task.toObject(),['__v', '_id'])
	}
}
