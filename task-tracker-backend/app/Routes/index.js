const server = require('../../Server');
const router = server.getRouter();
// router.get('/tasks/create', require('#Controllers/Tasks/Create'));
router.get('/tasks/create', async (ctx, next) => {
	console.log(module.filename,ctx);
});
