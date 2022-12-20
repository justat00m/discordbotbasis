require('cute-logs');
module.exports = {
    name: "databaseConnect",
    once: false,
    async execute(interaction, client) {
        const mongoose = require('mongoose');
        const config = require('../../Settings/bot.config.js');
        mongoose.connect(config.database.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
        console.log('\n')
        console.success(`| Connected MongoDB`, "✔ CONNECTED")
        }).catch((err) => {
            console.error(`| ${err}`, '✖ ERROR');
        });

        console.log('süü')
    }

}