console.time('appstart');
const server = require('../Server/index.js');

require('$Routes/index');

const App = new class {
	init() {

		const port = 8080;

		server.startServer(port);
		console.timeEnd('appstart');

		console.log(module.filename, `listening on *: ${port}`);
	}
};

App.init();

module.exports = App;
