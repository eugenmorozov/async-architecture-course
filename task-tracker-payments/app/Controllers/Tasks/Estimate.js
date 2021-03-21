const Task = require('$Models/Task')
const { sendEvent } = require('$Modules/MB');
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = async data => {
	const { id, description } = data;

	const cost = getRandomInt(10, 21);
	const reward = getRandomInt(20, 41);

	const result = await Task.create({
		_id: id,
		cost, reward,
		description,
	});

	await sendEvent('payments', 'TaskEstimated', {
		id: result._id,
		cost, reward,
	});
}
