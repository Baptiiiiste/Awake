
module.exports = {
    name: 'lockdown',
    category: 'moderation',
    permissions: ['MANAGE_SERVER'],
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

