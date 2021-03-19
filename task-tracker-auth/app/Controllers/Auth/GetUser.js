const Session = require('$Models/Session')

module.exports = async (ctx) => {
	const { token } = ctx.request.body;
	console.log(module.filename, token);
	if (!token){
		ctx.body = {error: 'Сессия не найдена, укажите токен авторизации'}
	}
	const userInfo = await Session.findOne({token}).lean();
	if (!userInfo){
		ctx.body = {error: 'Сессия не найдена, войдите снова'}
	}

	ctx.body = {
		user: userInfo,
	}
}
