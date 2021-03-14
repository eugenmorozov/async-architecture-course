console.time('appstart');
const server = require('../Server/index.js');
const mongoose = require('$Modules/Mongoose')

require('$Routes/index');

const App = new class {
	init() {
		const port = 8079;
		mongoose.connectDB()
			.then( () =>{
				server.startServer(port);
				console.timeEnd('appstart');
				console.log(module.filename, `listening on *: ${port}`);
			});
	}
};

App.init();

module.exports = App;
