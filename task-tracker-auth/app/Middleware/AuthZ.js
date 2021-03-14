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
		throw new Error('Вы не авторизованы для совершения этой операции')
	}
	const roleLevel = rolePermissions[role][domain] || 0;
	if(roleLevel < requiredLevel)
		throw new Error('Недостаточно прав для совершения этой операции')

	await next();
}



const checkersByDomain = {};
Object.keys(domains).forEach( domain => {
	checkersByDomain[domain] = {
		read: checkAccess(domain)(1),
		write: checkAccess(domain)(2),
		admin: checkAccess(domain)(3),
	};
})

// '/api/do', Tasker.Read(), () => {doooo}
module.exports = checkersByDomain;


