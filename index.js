const Insta = require('@androz2091/insta.js');
const client = new Insta.Client();
const fs = require('fs');
const ascii = require("ascii-table");
const config = require('./config.json');
let table = new ascii("Events");
table.setHeading("Events", "Loaded");
username = config.username;
password = config.password;

client.on('rawFbns', (data) => console.log(data));

const events = fs.readdirSync(`./Events/`).filter(file => file.endsWith(".js"));
    
for (let file of events) {
	let realevents = require(`./Events/${file}`);
	let event = file.split(".")[0];

	if (realevents) {
		client.on(event, realevents.bind(null, client));
		table.addRow(file, '✅');
	} else {
		table.addRow(file, `❌`);
		continue;
	}
}
console.log(table.toString());

client.login(username, password);