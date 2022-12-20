require('cute-logs');
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log('\n')
        console.success(`| Bot logged as ${client.user.tag}`, "✔ LOGGED IN")
        client.user.setPresence({ activities: [{ name: 'COMING SOON!' }], status: 'online'});
    }
}