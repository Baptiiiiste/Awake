const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member) {

        const fetchGuild = await client.getGuild(member.guild);

        if(fetchGuild.lockdown == true) { 

            const user = client.users.cache.get(member.id);
            try{ 
                await user.send(`❌ You tried to join the server \`${client.guilds.cache.get(fetchGuild.id).name}\` (**ID**: \`${fetchGuild.id}\`) but the the server is locked, try again later.`) 
            }
            catch(e){ 
                console.log(`❌ I tried to send a message to ${user.tag} but I couldn't send it.`)
            }
            
            return member.kick({reason: `Server locked.`}) ;
        
        }

        const logChannel = client.channels.cache.get(fetchGuild.logChannel);

        const embed = new EmbedBuilder()
            .setAuthor({name: `${member.user.tag
            } (${member.id})`, iconURL: member.user.displayAvatarURL()})
            .setColor('#21ff81')
            .setDescription(`± Username: ${member}
            ± Created at: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            ± Joined at: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
            `)
            .setTimestamp();

        if(logChannel) {
            try{
                logChannel.send({ embeds: [embed] });
            }catch(e){}
        }
    }
}

