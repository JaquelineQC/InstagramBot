const config = require('../config.json');
const language = require('../language.json')

module.exports = async(client, user) => {
	console.log(`${language[config.language]["connected"]}${client.user.username}`)
};