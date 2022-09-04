module.exports = {
    name: 'emoji',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'emoji',
    examples: ['emoji'],
    description: 'Utiliser les emojis',
    async runInteraction(client, interaction) {

        const poll = await interaction.reply({ content : "emoji :)", fetchReply: true });
        await poll.react('❌');
        await poll.react('🟦');
        await poll.react('✅');

    }
};

