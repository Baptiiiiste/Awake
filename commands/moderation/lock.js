const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'lock',
    category: 'moderation',
    permissions: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    usage: 'lock',
    examples: [''],
    description: 'Lock a channel',
    async runInteraction(client, interaction, guildSettings) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false })

        const response = new EmbedBuilder()
            .setColor("#E4BD0C")
            .setDescription(`🔐 Channel locked`);

        await interaction.reply({embeds: [response], ephemeral: true});
    }
};

