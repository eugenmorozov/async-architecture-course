const Wallet = require('$Models/Wallet');

module.exports = async () => {
	console.log(module.filename, 'Крон с выплатами запущен');
	const wallets = await Wallet.find({});
	const payPromises = wallets.map( async wallet => {
		if(wallet.sum > 0){
			const total = wallet.sum;
			console.log(`Пользователю ${wallet.employee_id} выплачен ежедневный заработок в размере ${total} деняк`);
			wallet.sum = 0;
			await wallet.save();
			await sendEvent('payments', 'WalletPaymentSent', {
				employee_id: wallet.employee_id,
				total,
				description: `Выплата зп ${wallet.employee_id} в размере ${total} деняк`,
			});
		}
	})
	await Promise.all(payPromises);
	console.log(module.filename, 'Крон с выплатами отработал');
}
