const Session = require('$Models/Session')


module.exports = async (ctx, next) => {
	const { access_token: token } = ctx.request.headers;
	if (!token){
		throw new Error('Вы не авторизованы')
	}

	const userSession = await Session.findOne({token});
	if (!userSession)
		throw new Error('Вы не авторизованы')

	ctx.state.user = {
		login: userSession.login,
		email: userSession.email,
		phone: userSession.phone,
		role: userSession.role,
	}
	await next();
}
