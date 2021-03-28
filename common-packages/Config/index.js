const config = require('./services.json');
module.exports = (env) => config[env];
