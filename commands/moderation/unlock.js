const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'unlock',
    category: 'moderation',
    permissions: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    usage: 'unlock',
    examples: [''],
    description: 'UnLock a channel',
    async runInteraction(client, interaction, guildSettings) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true })
        const response = new EmbedBuilder()
            .setColor("#E4BD0C")
            .setDescription(`🔓 Channel unlocked`);

        await interaction.reply({embeds: [response], ephemeral: true});
    }
};

