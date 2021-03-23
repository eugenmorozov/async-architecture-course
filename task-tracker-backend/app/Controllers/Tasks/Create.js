const Task = require('$Models/Task')
const { omit } = require('lodash');
const { sendEvent } = require('$Modules/MB');

module.exports = async ctx => {
	const { description } = ctx.request.body;
	if(!description){
		throw new Error('description required');
	}
	const result = (await Task.create({
		description,
	})).toObject();
	result.id = result._id;

	await sendEvent('tasks', 'TaskCreated', {
		id: result.id,
		description: result.description
	});

	ctx.body = {
		...omit(result,['__v', '_id'])
	}
}
