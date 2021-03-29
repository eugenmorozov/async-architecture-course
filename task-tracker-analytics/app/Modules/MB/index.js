const amqp = require('amqplib/callback_api');
const CONN_URL = 'amqps://njmtrfcd:ho4SCfZtmeueDfg9o6XuJB3n1rAkziBP@kangaroo.rmq.cloudamqp.com/njmtrfcd';
const validateEventSchema = require('$Modules/SchemaRegistry');

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
	conn.createChannel(function (err, channel) {
		ch = channel;
		require('./queueHandler')(ch);
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
