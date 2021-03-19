const User = require('$Models/User')

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

	ctx.body = {
		success: true
	}
}
