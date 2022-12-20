const {
    ApplicationCommandOptionType,
    SlashCommandBuilder,
    PermissionsBitField
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder().setName("unban")
      .setDescription("Unban's someone in the server.")
      .addStringOption((option) =>
          option 
              .setName("person")
              .setDescription("Select the person who you want to ban.")
              .setRequired(true)
      ),
    async execute(interaction, client) {
      await interaction.deferReply();
      const member = interaction.options.get("person").value;
  
      if (
        !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
      )
        return;
  
    try {
      await interaction.guild.bans.fetch(member);
      await interaction.guild.bans.remove(member)
      interaction.followUp({ content: `*User <@${member}> is Unbanned!*` });
  } catch {
      interaction.followUp({ content: `*User <@${member}> is not Banned!*` });
  }
    },
  };
  