const amqp = require('amqplib/callback_api');
const CONN_URL = 'amqps://njmtrfcd:ho4SCfZtmeueDfg9o6XuJB3n1rAkziBP@kangaroo.rmq.cloudamqp.com/njmtrfcd';
const queueHandler = require('./queueHandler');
const validateEventSchema = require('$Modules/SchemaRegistry');

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
	conn.createChannel(function (err, channel) {
		ch = channel;

		ch.consume('users', (msg) => {
			const event = JSON.parse(msg.content.toString());
			console.log(module.filename, 'получено событие', event);
			validateEventSchema({...event})
			return queueHandler(msg)
		}, {
			noAck: true
		});
	});
});

const sendEvent = async (queueName, eventName, data) => {
	validateEventSchema({eventName, data})
	ch.sendToQueue(queueName, new Buffer(JSON.stringify({
		name: eventName,
		data
	})));
}

process.on('exit', (code) => {
	ch.close();
	console.log(`Closing rabbitmq channel`);
});

module.exports = {sendEvent};
