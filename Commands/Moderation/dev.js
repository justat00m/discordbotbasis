const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("dev")
    .setDescription(`Commands for developer`)
    .addSubcommand((subcommand) =>
        subcommand
          .setName("eval")
          .setDescription("Run a code")
          .addStringOption((option) =>
            option
              .setName("command")
              .setDescription("The username of the player")
              .setRequired(true)
          )
      ),
      
  async execute(interaction, client) {
    if(interaction.member.id !== "524213944043438098") return interaction.reply({content: "You Need To Be A Developer", ephemeral: true})
    await interaction.deferReply();

    const clean = async (text) => {
        // If our input is a promise, await it before continuing
        if (text && text.constructor.name == "Promise")
          text = await text;
        
        // If the response isn't a string, `util.inspect()`
        // is used to 'stringify' the code in a safe way that
        // won't error out on objects with circular references
        // (like Collections, for example)
        if (typeof text !== "string")
          text = require("util").inspect(text, { depth: 1 });
        
        // Replace symbols with character code alternatives
        text = text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
        
        // Send off the cleaned up result
        return text;
        }

        try {

            const evaled = eval(interaction.options.get("command").value);

      // Put our eval result through the function
      // we defined above
      const cleaned = await clean(evaled);

      // Reply in the channel with our result
      interaction.followUp(`\`\`\`js\n${cleaned}\n\`\`\``);
        } catch (err) {
          interaction.followUp(`${err}`);
        }
      
    
  },
};
