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
        await message.reply({content: "✅ Bot restarted !", ephemeral: true});
        return process.exit();
    }
};

