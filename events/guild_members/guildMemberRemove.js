const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(client, member) {

        const fetchGuild = await client.getGuild(member.guild);
        const fetchKickLog = await member.guild.fetchAuditLogs({ 
            limit: 1,
            type: 'MEMBER_KICK'
         });

        const kickLog = fetchKickLog.entries.first();
        const { target, reason } = kickLog;
        let isMemberKick = false;

        if ( target.id == member.id ) isMemberKick = true;


        const embed = new EmbedBuilder()
            .setAuthor({name: `${member.user.tag
            } (${member.id})`, iconURL: member.user.displayAvatarURL()})
            .setColor('#FD3333')
            .setDescription(`± Nom d'utilisateur: ${member}
            ± Compte crée le: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            ± Serveur quitté le: <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)
            ${isMemberKick ? `± A été exclu pour \`${reason}\`` : ''}
            `)
            .setTimestamp();
            
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        logChannel.send({ embeds: [embed]});
    }
}

