const Perms = require('../../utils/Perms.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'lockdown',
    category: 'moderation',
    permissions: [Perms.MANAGE_GUILD, Perms.KICK_MEMBERS],
    ownerOnly: false,
    usage: 'lockdown',
    examples: ['lockdown'],
    description: 'Lock the server',
    async runInteraction(client, interaction, guildSettings) {
        let action = "";
        if(guildSettings.lockdown == false){
            action = "🔐 Server locked"
            await client.updateGuild(interaction.guild, {lockdown: true});
            await interaction.reply({content: action, ephemeral: true});
        }else{
            action = "🔓 Server unlocked"
            await client.updateGuild(interaction.guild, {lockdown: false});
            await interaction.reply({content: action, ephemeral: true});
        }

        const embed = new EmbedBuilder()
            .setTitle(action)
            .setColor("#F08938")
            .setDescription(`
**Moderator:** ${interaction.user.tag}
**ID:** ${interaction.user.id}`)
            .setTimestamp();

        const logChannel = client.channels.cache.get(guildSettings.logChannel);
        if(logChannel) {
            try{
                logChannel.send({ embeds: [embed] });
            }catch(e){}
        }
        

    }
};

