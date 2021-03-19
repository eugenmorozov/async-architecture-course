const server = require('../../Server');
const router = server.getRouter();

router.post('/api/register', require('$Controllers/Auth/Register'));
router.post('/api/login', require('$Controllers/Auth/Login'));

//пример того, как работает аутентификация пользователя
const authN = require('$Middleware/AuthN');
const { Tasker } = require('$Middleware/AuthZ');
router.use('/someapi', authN);
router.get('/someapi/get-user', Tasker.read, async (ctx, next) => {
	ctx.body = ctx.state.user;
});

router.get('/someapi/write-user', Tasker.read, async (ctx, next) => {
	ctx.body = ctx.state.user;
});

router.get('/someapi/admin-user', Tasker.admin, async (ctx, next) => {
	ctx.body = ctx.state.user;
});

