const config = require('../Config')('dev');
const {auth: {host, port}} = config;

const axios = require('axios');

const authn = async (ctx, next) => {
	const {token} = ctx?.request?.headers;
	const {data: {user, error}} = await axios.post(`http://${host}:${port}/api/get-user`, { token });
	if(error)
		throw new Error(error);
	if(!user){
		ctx.body = {
			error: 'Попробуйте войти в систему ещё раз'
		}
	}
	if(user){
		ctx.state.user = {
			login: user.login,
			email: user.email,
			phone: user.phone,
			role: user.role,
		}
		await next();
	} else {
		ctx.body = {
			error: 'Попробуйте войти в систему ещё раз'
		}
	}
}

const domains = {
	Tasker: 'Tasker',
	Payments: 'Payments',
	Analytics: 'Analytics',
}

const roles = {
	developer: 'developer',
	manager: 'manager',
	admin: 'admin',
	accountant: 'accountant'
}

const rolePermissions = {
	developer: {
		Tasker: 2,
	},
}
const checkAccess = domain => requiredLevel => async (ctx, next) => {
	const { role } = ctx.state.user
	if (!role) {
		ctx.request.body = {
			error: 'Вы не авторизованы для совершения этой операции'
		}
	}
	const roleLevel = rolePermissions[role][domain] || 0;
	if(roleLevel < requiredLevel)
		return ctx.body = {
			error: 'Недостаточно прав для совершения этой операции'
		}

	await next();
}

const authz = {};
Object.keys(domains).forEach( domain => {
	authz[domain] = {
		read: checkAccess(domain)(1),
		write: checkAccess(domain)(2),
		admin: checkAccess(domain)(3),
	};
})

module.exports = {authn, authz};
