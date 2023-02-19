const Perms = require('../../utils/Perms.js');

module.exports = {
    name: 'lockdown',
    category: 'moderation',
    permissions: [Perms.MANAGE_GUILD, Perms.KICK_MEMBERS],
    ownerOnly: false,
    usage: 'lockdown',
    examples: ['lockdown'],
    description: 'Lock the server',
    async runInteraction(client, interaction, guildSettings) {
        
        if(guildSettings.lockdown == false){
            await client.updateGuild(interaction.guild, {lockdown: true});
            interaction.reply({content: "🔒 Server locked", ephemeral: true});
        }else{
            await client.updateGuild(interaction.guild, {lockdown: false});
            interaction.reply({content: "🔓 Server unlocked", ephemeral: true});
        }

    }
};

