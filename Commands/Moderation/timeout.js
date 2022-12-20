const {
    ApplicationCommandOptionType,
    SlashCommandBuilder,
    PermissionsBitField,
    Permissions
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder().setName("timeout")
      .setDescription("Timeout' someone.")
      .addUserOption((option) =>
          option 
              .setName("kisi")
              .setDescription("Who you want to timeout?")
              .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("zaman")
          .setDescription("For how long?")
          .setRequired(true)
          .addChoices(
            {
              name: "1 Dakika",
              value: "60000",
            },
            {
              name: "5 Dakika",
              value: "300000",
            }
          )
      )
      .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("Why are you executing a timeout?")
                .setRequired(false)
        ),
    
    async execute(interaction, client) {
    if(!interaction.member.permissions.has("MODERATE_MEMBERS")) return interaction.reply({content: "You don't have authority yo use this command.", ephemeral: true});
      const member = interaction.options.get("person").member;
      const reason = interaction.options.get("reason")?.value || "No Reason";
      const time = Math.floor(new Date(Date.now() + parseInt(interaction.options.get("zaman").value))/1000.0) || Math.floor(new Date(new(Date(Data.now() + 3600000)))/1000.0);
  
      member
        .timeout(time, reason)
        .then(() => {
          interaction.reply({ content: `${member.user.tag} timeouted.` });
        })
        .catch((err) => {
          interaction.reply({
            content: `I couldn't timeout ${member.user.tag} because of: ${err}`,
          });
        });
    },
  };
  