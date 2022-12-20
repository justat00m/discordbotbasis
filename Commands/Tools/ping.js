const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription(`Returns the bot's ping`),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true

        });


        const pingMessage = `<a:2eb80148d6ee4eea9b3e62cbbd894dd2:841304773005017100> API Latency: ${client.ws.ping}\n<a:2eb80148d6ee4eea9b3e62cbbd894dd2:841304773005017100> Client Ping: ${message.createdTimestamp - interaction.createdTimestamp}`
        await interaction.editReply({
            content: pingMessage
           
            //})
        })
        

        
    }
    

}

//data: new SlashCommandBuilder().setName('help').setDescription(`Get help with the bot.`),
  //  async execute(interaction, client) {
       // const message = await interaction.deferReply({
          //  fetchReply: true
      //  });

       // const helpMessage1 = new EmbedBuilder()
           // .setColor(`#00FF00`)
           // .setAuthor({
              //  name: `${interaction.user.username}`,
               // iconURL: interaction.user.displayAvatarURL(),
                //url: `https://discord.com/user/${interaction.user.id}`,
           // })
          //  .setTitle(`Help`)
           // .setDescription(`Here is a list of commands you can use with the bot.`)
           // .addFields(
               // { name: `Ping`, value: `Get the bot's ping.`, inline: true },
               // { name: `Help`, value: `Get help with the bot.`, inline: true },
               // { name: `Invite`, value: `Get the bot's invite link.` },
               // { name: `Support`, value: `Get the bot's support server.` },
               // { name: `Vote`, value: `Get the bot's vote link.` },
               // { name: `Info`, value: `Get information about the bot.` },
           // )
           // .setFooter({
               // text: "FearlessBOT | Made by at00m#1944",
               // iconURL: `${client.user.displayAvatarURL()}`,
               // url: `https://fearlessbot.xyz/`,
             // });

       // await interaction.editReply({
            //embeds: [helpMessage1]
        //})

   // }
//