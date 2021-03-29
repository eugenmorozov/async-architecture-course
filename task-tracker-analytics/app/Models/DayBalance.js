const mongoose = require('$Modules/Mongoose');

const DayBalanceSchema = new mongoose.Schema({
	spent: {
		type: Number,
		default: 0,
	},
	earned: {
		type: Number,
		default: 0,
	},
	created: {
		type: Date,
		default: Date.now,
	}
});

module.exports = mongoose.model('day_balance', DayBalanceSchema);
