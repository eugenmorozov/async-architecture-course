const server = require('../../Server');
const router = server.getRouter();

router.get('/balance/current', require('$Controllers/Balance/GetDayBalance'));
router.get('/most-expensive-task/get', require('$Controllers/Balance/GetMostExpensiveTask'));
