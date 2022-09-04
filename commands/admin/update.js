const { Guild } = require("../../models/index")

module.exports = {
    name: 'update',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'update',
    examples: [],
    description: 'Update la base de données',
    async runInteraction(client, interaction, guildSettings) {
        await Guild.updateMany({}, { "$set": { "testChannel": "809403773709582336" }, upsert: true });
        interaction.reply("`BOT | Mise à jour de la base de données`");
    }
};

