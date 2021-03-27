module.exports = {
	type: 'object',
	properties: {
		employee_id: {type: 'string'},
		total: {type: 'number'},
		description: {type: 'string'},
		task_description: {type: 'string'},
	},
	required: ['employee_id', 'total', 'description', 'task_description'],
	additionalProperties: false
}
