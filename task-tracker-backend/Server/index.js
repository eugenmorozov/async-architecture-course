const Koa = require('koa');
const http = require('http');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const Server = class {

	constructor() {
		this.app = new Koa();
		this.router = new Router();
	}

	getRouter() {
		return this.router;
	}

	startServer(port) {
		this.app
			.use(bodyParser({ jsonLimit: '50mb' }))
			.use(this.router.routes())
			.use(this.router.allowedMethods());
		this.server = http.createServer(this.app.callback())
		this.server.listen(port);
	}

}

module.exports = new Server();
