const Performer = require('$Models/Performer');

module.exports = async msg => {
	const { name, data } = JSON.parse(msg.content.toString());
	switch (name) {
		case 'UserCreated':
			await Performer.create(data);
			break;
		default:
			console.error(`Неизвестное сообщение ${name}`)
	}
}
