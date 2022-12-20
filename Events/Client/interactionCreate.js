module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction, client) {
        if(interaction.isChatInputCommand()){
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if(!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error)
                await interaction.reply({
                    content: `✖ | Oops! Something went wrong...`,
                    ephemeral: true
                })
                
            }

        }
    }
}