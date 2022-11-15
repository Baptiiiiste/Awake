const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'unban [id]',
    examples: ['unban 12484142515756548'],
    description: 'Unban someone from the server',
    options: [
        {
            name: "memberid",
            type: ApplicationCommandOptionType.String,
            description: "User's ID to unban",
            required: true
        },
        {
            name: "reason",
            type: ApplicationCommandOptionType.String,
            description: "Reason",
            required: false
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const member = interaction.options.getString("memberid", true);
        const reason = interaction.options.getString("reason") || "No reason given";

        const embed = new EmbedBuilder()
            .setTitle(`⚒️ User unbanned from the server`)
            .setColor("#8eff4d")
            .setDescription(`
		**Member:** <@${member}>
		**ID:** ${member}
		**Moderator:** ${interaction.user.tag}
		**Reason:** ${reason}`)
            .setTimestamp();

        const response = new EmbedBuilder()
            .setColor("#5DBC4C")
            .setDescription(`✅ User <@${member}> was unbanned from the server. \n➡️ Reason: ${reason}`);


        const logChannel = client.channels.cache.get(guildSettings.logChannel);
        if(logChannel) logChannel.send({ embeds: [embed] });

        await interaction.guild.members.unban(member);
        await interaction.reply({embeds: [response], ephemeral: true});
    }
};

