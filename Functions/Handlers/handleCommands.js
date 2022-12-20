const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const config = require("../../Settings/bot.config");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./Commands");

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./Commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../Commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log('\n');
        console.success(`| ${command.data.name.toUpperCase()} has been successfully uploaded.`, "⚜ COMMAND")
      }
    }

    const token = config.bot.TOKEN;
    const clientID = config.bot.ID;
    const rest = new REST({ version: "10" }).setToken(token);

    (async () => {
      try {        
        console.log('\n')
        console.info(`| Started refreshing application [/] commands.`, "≋ HANDLE")

        await rest.put(Routes.applicationCommands(clientID), {
          body: client.commandArray,
        });

        console.log('\n')
        console.success(`| Successfully reloaded application [/] commands.`, "≋ HANDLE")
      } catch (error) {
        console.log('\n')
        console.error(`| ${error}`, '✖ ERROR');
      }
    })();
  };
};
