
module.exports = {
    name: 'lockdown',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ban [@user] [reason]',
    examples: ['ban @awake Swearing'],
    description: 'Ban someone from the server.',
    async runInteraction(client, interaction, guildSettings) {
        
        if(guildSettings.lockdown == false){
            await client.updateGuild(interaction.guild, {lockdown: true});
            interaction.reply({content: "🔒 Server locked"});
        }else{
            await client.updateGuild(interaction.guild, {lockdown: false});
            interaction.reply({content: "🔓 Server unlocked"});
        }

    }
};

