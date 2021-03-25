const mongoose = require('$Modules/Mongoose');

const WalletSchema = new mongoose.Schema({
	employee_id: {
		type: String,
		index: true,
	},
	sum: {
		type: Number
	},
});

module.exports = mongoose.model('wallets', WalletSchema);
