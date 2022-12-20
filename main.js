const { Client, Collection, GatewayIntentBits} = require('discord.js');
const client= new Client({ intents: GatewayIntentBits.Guilds});
const fs = require('fs');
const config = require('./Settings/bot.config.js')
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./Functions`);

for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./Functions/${folder}`).filter((file) => file.endsWith(".js"));

    for (const file of functionFiles) require(`./Functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();

client.login(config.bot.TOKEN);