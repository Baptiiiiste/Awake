const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Perms = require('../../utils/Perms.js');
module.exports = {
    name: 'slowmode',
    category: 'moderation',
    permissions: [Perms.MANAGE_CHANNELS],
    ownerOnly: false,
    usage: 'slowmode [amount]',
    examples: ['slowmode 10', 'slowmode 0'],
    description: 'Enable or disable the slowmode in a channel',
    options: [
        {
            name: 'value',
            description: 'Ratelimit',
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const value = interaction.options.getNumber("value");
        await interaction.channel.setRateLimitPerUser(value);

        if (value == 0) {
            const response = new EmbedBuilder()
                .setColor("#952CB7")
                .setDescription("🐇 Slowmode disabled");
            return interaction.reply({ embeds:[response], ephemeral: true });
        } else {
            const response = new EmbedBuilder()
                .setColor("#952CB7")
                .setDescription(`🐌 Slowmode enabled - ${value} second${value > 1 ? "s" : ""}`);
            return interaction.reply({ embeds:[response], ephemeral: true });
        }
    }
};

