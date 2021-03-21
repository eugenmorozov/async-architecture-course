const { sendEvent } = require('$Modules/MB');
const Performer = require('$Models/Performer');
const Task = require('$Models/Task');

const { omit } = require('lodash');
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = async ctx => {
	const performers = await Performer.find({}).lean();
	if(!performers){
		throw new Error('Исполнители не найдены')
	}
	const tasks = await Task.find({});
	const taskPromises = tasks.map( async task => {
		const performer = performers[getRandomInt(0, performers.length)];
		task.assignee_id = performer.id;
		const { _id, description, assignee_id } = task.toObject
		await task.save();

		await sendEvent('tasks', 'TaskAssigned', {
			id: _id, description, assignee_id,
		});
	});
	const res = await Promise.all(taskPromises);

	ctx.body = {
		success: true,
		assigned_tasks: res.length,
	}
}
