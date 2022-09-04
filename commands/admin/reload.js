const { Guild } = require("../../models/index");


module.exports = {
    name: 'reload',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'reload',
    examples: [],
    description: 'restart the bot',
    async run(client, message, args) {
        await message.reply("Bot restarted !");
        return process.exit();
    }
};

