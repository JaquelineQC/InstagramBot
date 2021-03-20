const config = require('../config.json');
const language = require('../language.json')

module.exports = async(client, message) => {
	if(message.author.username == client.user.username) return;
	const prefix = config.prefix;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const commande = args.shift();
	if(message.content.startsWith(prefix)){
		if(commande == "ping"){
			await message.chat.sendMessage(`⏳ ${language[config.language]["waiting"]}...`).then(
				async(m) => {
					m.delete()
					await message.chat.sendMessage(`${(m.timestamp - message.timestamp) / 1000}ms`);
				}
			);
		}

		if(commande == "avatar"){
			await message.chat.sendMessage(`⏳ ${language[config.language]["waiting"]}...`).then(
				async(m) => {
					m.delete()
					await message.chat.sendMessage(message.author.avatarURL);
				}
			); 
		}

		if(commande == "followme"){
			await message.chat.sendMessage(`⏳ ${language[config.language]["waiting"]}...`).then(
				async(m) => {
					await message.author.follow().then(message.chat.sendMessage(language[config.language]["followed"]));
				}
			);
		}

		if(commande == "sendvoice"){
			console.log(args[0]);
			if(args[0].includes("https://www.youtube.com/watch?v=") || args[0].includes("https://youtu.be/")){
				var ytb = args[0];
			}else{
				message.chat.sendMessage("Vidéo non trouvée")
				var ytb = "http://www.youtube.com/watch?v=A02s8omM_hI";
			}
			const ytdl = require('ytdl-core');
			const stream = ytdl(ytb, { filter: format => format.container === 'mp4' });
			const array = [];
			stream
			.on('data', chunk => {
				array.push(chunk);
			})
			.on('end', () => {
				message.chat.sendVoice(Buffer.concat(array));
			});
		}
	}
	console.log(`${message.author.username}${language[config.language]["receivedMsg"]}${message.content}`)
};