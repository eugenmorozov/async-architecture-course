const DayBalance = require('$Models/DayBalance')

module.exports = async data => {
	const { total } = data;
	const dayStart = (new Date()).setHours(0,0,0,0);
	const dayEnd = (new Date().setHours(23,59,59,999));
	const currentBalance = await DayBalance.findOne({
		created: {
			$gte: dayStart,
			$lte: dayEnd,
		}
	});
	const earned = total < 0 ? -total : 0;
	const spent = total > 0 ? total : 0;
	if (!currentBalance){
		const newBalance = DayBalance.create({
			earned, spent
		});
		console.log(module.filename, newBalance);
		await newBalance.save();
	} else {
		currentBalance.earned += earned;
		currentBalance.spent += spent;
		await currentBalance.save();
	}
}
