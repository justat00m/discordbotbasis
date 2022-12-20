const {
  ApplicationCommandOptionType,
  SlashCommandBuilder,
  PermissionsBitField
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick's Someone")
    .addUserOption((option) =>
      option
        .setName("kisi")
        .setDescription("Who You Want To Kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("sebep")
        .setDescription("Why You Want To Kick!")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const member = interaction.options.get("kisi").member;
    const reason = interaction.options.get("sebep")?.value || "";

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)
    )
      return;

    member
      .kick({ reason: `${reason} | Moderatör: ${interaction.member.user.tag}` })
      .then(() => {
        interaction.reply({ content: `${member.user.tag} has been kicked.` });
      })
      .catch((err) => {
        interaction.reply({
          content: `I couldn't kick ${member.user.tag} because of: ${err}`,
        });
      });
  },
};
