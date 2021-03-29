const DayBalance = require('$Models/DayBalance')

module.exports = async (ctx) => {
	const dayStart = (new Date()).setHours(0,0,0,0);
	const dayEnd = (new Date().setHours(23,59,59,999));
	let currentBalance = await DayBalance.findOne({
		created: {
			$gte: dayStart,
			$lte: dayEnd,
		}
	});
	if (!currentBalance){
		const currentBalance = DayBalance.create({});
		await currentBalance.save();
	}
	ctx.body = {
		earned: currentBalance.earned,
		spent: currentBalance.spent,
		total: currentBalance.earned - currentBalance.spent,
	}
}
