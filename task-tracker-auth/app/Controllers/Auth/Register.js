const User = require('$Models/User')
const { sendEvent } = require('$Modules/MB');

module.exports = async (ctx) => {
	const {
		login, password,
		email, phone,
		role
	} = ctx.request.body;

	const newUser = await User.create({
		login, password,
		email, phone,
		role
	});
	await newUser.save();
	await sendEvent('users', 'UserCreated', {
		id: newUser._id,
		login: newUser.login,
	})
	ctx.body = {
		success: true
	}
}
