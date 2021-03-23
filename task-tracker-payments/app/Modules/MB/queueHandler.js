const Estimate = require('$Controllers/Tasks/Estimate');
const Withdraw = require('$Controllers/Wallet/Withdraw');
const Charge = require('$Controllers/Wallet/Charge');

const handler = async msg => {
	console.log(module.filename, 'получено событие', msg.content.toString());
	const { name, data } = JSON.parse(msg.content.toString());
	switch (name) {
		case 'TaskCreated':
			await Estimate(data);
			break;
		case 'TaskAssigned':
			await Withdraw(data);
			break;
		case 'TaskClosed':
			await Charge(data);
			break;
		default:
			console.error(`Неизвестное сообщение ${name}, ${msg.content.toString()}`)
	}
}

module.exports = (ch) => {
	ch.consume('tasks', handler, {
		noAck: true
	});
}
