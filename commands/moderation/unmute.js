const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Perms = require('../../utils/Perms.js');
module.exports = {
    name: 'unmute',
    category: 'moderation',
    permissions: [Perms.MODERATE_MEMBERS],
    ownerOnly: false,
    usage: 'unmute [@user]',
    examples: ['unmute @awake'],
    description: 'UnMute someone',
    options: [
        {
            name: "member",
            type: ApplicationCommandOptionType.User,
            description: "User to unmute",
            required: true
        },
        {
            name: "reason",
            type: ApplicationCommandOptionType.String,
            description: "Reason for mute",
            required: false
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const member = interaction.options.getMember("member", true);
        const reason = interaction.options.getString("reason") || "No reason given";



        if (!member) return interaction.reply({ embeds: [AutoEmbed.sendErrorEmbed(`Member not found.`)], ephemeral: true });

        const response = new EmbedBuilder()
            .setColor("#5DBC4C")
            .setDescription(`✅ User ${member} was unmuted from the server. \n➡️ Reason: ${reason}`);

        const embed = new EmbedBuilder()
            .setTitle(`⚒️ User unmuted from the server`)
            .setThumbnail(member.displayAvatarURL())
            .setColor("#8eff4d")
            .setDescription(`
**Member:** ${member.user.tag}
**ID:** ${member.id}
**Moderator:** ${interaction.user.tag}
**Reason:** ${reason}`)
            .setTimestamp();

        await member.timeout(null, reason);
        
        const logChannel = client.channels.cache.get(guildSettings.logChannel);
        if(logChannel) {
            try{
                logChannel.send({ embeds: [embed] });
            }catch(e){}
        }


        await interaction.reply({ embeds: [response], ephemeral: true });


    }
};

