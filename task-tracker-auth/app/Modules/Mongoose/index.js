const mongoose = require('mongoose');
const login = process.env.MONDO_USR || false;
const password = process.env.MONGO_PWD || false;

const connect = async () => {
	await mongoose
		.connect(`mongodb+srv://${login}:${password}@cluster0.zfuvz.mongodb.net/Auth?retryWrites=true&w=majority`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.catch(e => {
			console.error('Mongo connecting error', e);
			process.exit(1);
		});
}

module.exports = mongoose;
module.exports.connectDB = connect;
