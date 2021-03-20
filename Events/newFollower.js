const config = require('../config.json');
const language = require('../language.json')

module.exports = async(client, user) => {
    console.log(`${user.fullName}${language[config.language]["follow"]}`)
    user.chat.sendMessage("Merci d'avoir follow" + client.user.fullName)
    console.log(user)
};