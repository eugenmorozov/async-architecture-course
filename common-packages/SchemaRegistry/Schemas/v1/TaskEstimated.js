module.exports = {
	type: 'object',
	properties: {
		id: {type: 'string'},
		cost: {type: 'number'},
		reward: {type: 'number'},
	},
	required: ['id', 'cost', 'reward'],
	additionalProperties: false
}
