const fs = require("fs");
const { connection } = require("mongoose");
module.exports = (client) => {
  client.handleEvents = async () => {
    const eventFolders = fs.readdirSync("./Events");

    for (const folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(`./Events/${folder}`)
        .filter((file) => file.endsWith(".js"));

      switch (folder) {
        case "Client":
          for (const file of eventFiles) {
            const event = require(`../../Events/${folder}/${file}`);
            if (event.once)
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          }

          break;
        case "Database":
          for (const file of eventFiles) {
            const event = require(`../../Events/${folder}/${file}`);
            if(event.once) connection.once(event.name, (...args) => event.execute(...args, client));
            else connection.on(event.name, (...args) => event.execute(...args, client));
          }
          break;
        default:
          break;
      }
    }
  };
};
