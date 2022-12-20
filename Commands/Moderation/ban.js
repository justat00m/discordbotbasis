const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('ban').setDescription(`Bans a member`)
        .addUserOption(option => option.setName('member').setDescription('The member you want to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban').setRequired(false)),
    async execute(interaction, client) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return;
        const member = interaction.options.get("kisi").member;
        const reason = interaction.options.get("sebep")?.value || "Sebep Yok";
        
        member
        .ban({ reason: `${reason} | Moderatör: ${interaction.member.user.tag}` })
        .then(() => {
          interaction.reply({ content: `${member.user.tag} sunucudan yasaklandı.` });
        })
        .catch((err) => {
          interaction.reply({
            content: `I couldn't kick ${member.user.tag} because of: ${err}`,
          });
        });

    }

}