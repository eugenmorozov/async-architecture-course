module.exports = {
	type: 'object',
	properties: {
		id: {type: 'string'},
		description: {type: 'string'},
		assignee_id: {type: 'string'},
	},
	required: ['id', 'description', 'assignee_id'],
	additionalProperties: false
}
