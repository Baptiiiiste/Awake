const { Guild } = require("../../models/index");


module.exports = {
    name: 'reload',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'reload',
    examples: [],
    description: 'reload le bot',
    async run(client, message, args) {
        await message.reply("Bot relancé !");
        return process.exit();
    }
};

