console.time('appstart');
const server = require('../Server/index.js');
const mongoose = require('$Modules/Mongoose')

const App = new class {
	init() {
		const port = 8078;
		mongoose.connectDB()
			.then( () => {
				server.startServer(port);
				require('$Routes/index');
				console.timeEnd('appstart');
				console.log(module.filename, `listening on *: ${port}`);
			});
	}
};

App.init();

module.exports = App;
