module.exports = {
    name: 'lock',
    category: 'moderation',
    permissions: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    usage: 'lock',
    examples: [''],
    description: 'Lock un salon',
    async runInteraction(client, interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
            SEND_MESSAGES: false
        });
        
        await interaction.reply("Locked ! 🔐");
    }
};

