const User = require('$Models/User')
const Session = require('$Models/Session')
const { nanoid } = require('nanoid')

module.exports = async (ctx) => {
	const { login, password } = ctx.request.body;

	const user = await User.findOne({login});
	if (!password === user.password){
		throw new Error('Неверный пароль')
	}

	const token = nanoid(10);
	const session = await Session.create({
		login: user.login,
		email: user.email,
		phone: user.phone,
		role: user.role,
		token,
	});

	await session.save();

	ctx.body = {
		access_token: token,
	}
}
