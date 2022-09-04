const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member) {

        const fetchGuild = await client.getGuild(member.guild);

        const logChannel = client.channels.cache.get(fetchGuild.logChannel);

        const embed = new EmbedBuilder()
            .setAuthor({name: `${member.user.tag
            } (${member.id})`, iconURL: member.user.displayAvatarURL()})
            .setColor('#21ff81')
            .setDescription(`± Nom d'utilisateur: ${member}
            ± Compte crée le: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            ± Serveur rejoint le: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
            `)
            .setTimestamp();

        
        logChannel.send({ embeds: [embed]});
    }
}

