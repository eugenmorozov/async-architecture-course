const Task = require('$Models/Task')

module.exports = async (ctx) => {
	const dayStart = new Date(ctx.request.query.date_start || Date.now()).setHours(0,0,0,0);
	const dayEnd = new Date(ctx.request.query.date_end || Date.now()).setHours(23,59,59,999);
	if(dayEnd < dayStart)
		throw new Error(`Неправильный временной промежуток, начало: ${new Date(dayStart)}, конец: ${new Date(dayEnd)}`);
	let mostExpensiveTasks = await Task.find({
		created: {
			$gte: dayStart,
			$lte: dayEnd,
		}
	}).sort({created: -1});

	ctx.body = mostExpensiveTasks.map(mostExpensiveTask => {
		return {
			created: mostExpensiveTask.created,
			reward: mostExpensiveTask.reward,
			id: mostExpensiveTask._id
		}
	})
}
