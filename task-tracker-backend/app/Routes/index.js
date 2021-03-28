const server = require('../../Server');
const router = server.getRouter();
const {authn, authz : {Tasker}} = require('$Middleware/auth');
router.use('/', authn);

router.post('/tasks/create', Tasker.admin, require('$Controllers/Tasks/Create'));
// router.post('/tasks/create', require('$Controllers/Tasks/Create'));
router.post('/tasks/close', require('$Controllers/Tasks/Close'));
// router.post('/tasks/reopen', require('$Controllers/Tasks/Reopen'));
router.get('/tasks/list', require('$Controllers/Tasks/List'));

router.post('/tasks/assign', require('$Controllers/Tasks/Assign'));
