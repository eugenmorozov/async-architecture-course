const Ajv = require("ajv").default
const ajv = new Ajv()

module.exports = ({ eventName, version = 1, data }) => {
	const schema = require(`./Schemas/v${version}/${eventName}`);
	if(!schema)
		throw new Error(`Schema for event ${eventName} (ver ${version}) not found`);
	const validate = ajv.compile(schema);
	const valid = validate(JSON.parse(JSON.stringify(data)));
	if (!valid){
		console.log(module.filename, validate.errors);
		throw new Error(`Schema for event ${eventName} (ver ${version}) not valid`)
	}
}
