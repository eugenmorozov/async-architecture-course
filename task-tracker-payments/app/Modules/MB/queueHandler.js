const Estimate = require('$Controllers/Tasks/Estimate');
const Withdraw = require('$Controllers/Wallet/Withdraw');
const Charge = require('$Controllers/Wallet/Charge');
const validateEventSchema = require('$Modules/SchemaRegistry');

const handler = async msg => {
	const event = JSON.parse(msg.content.toString());
	console.log(module.filename, 'получено событие', event);
	validateEventSchema({
		eventName: event.name,
		data: event.data
	});
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
