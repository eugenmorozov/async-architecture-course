const Task = require('$Models/Task')
const { omit } = require('lodash');
module.exports = async (ctx, next) => {
	const { description } = ctx.request.body;
	if(!description){
		throw new Error('description required');
	}
	const result = (await Task.create({
		description,
	})).toObject();
	result.id = result._id;

	ctx.body = {
		...omit(result,['__v', '_id'])
	}
}
