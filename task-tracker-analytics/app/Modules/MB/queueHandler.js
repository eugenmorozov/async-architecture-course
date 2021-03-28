const validateEventSchema = require('$Modules/SchemaRegistry');

const UpdateMostExpensiveTask = require('$Controllers/Events/UpdateMostExpensiveTask');
const UpdateDayBalance = require('$Controllers/Events/UpdateDayBalance');

const handler = async msg => {
	const event = JSON.parse(msg.content.toString());
	console.log(module.filename, 'получено событие', event);
	validateEventSchema({
		eventName: event.name,
		data: event.data
	});
	const { name, data } = JSON.parse(msg.content.toString());
	switch (name) {
		case 'TaskEstimated':
			await UpdateMostExpensiveTask(data);
			break;
		case 'WalletCharged':
			await UpdateDayBalance(data);
			break;
		case 'WalletWithdrawn':
			await UpdateDayBalance(data);
			break;
		default:
			console.error(`Неизвестное сообщение ${name}, ${msg.content.toString()}`)
	}
}

module.exports = (ch) => {
	ch.consume('payments', handler, {
		noAck: true
	});
}
