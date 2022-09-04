const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'slowmode',
    category: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'clear [nombre] <@user>',
    examples: ['clear 50', 'clear 15 @user'],
    description: 'Supprimer un nombre de message sur un salon ou un utilisateur.',
    options: [
        {
            name: 'value', 
            description: 'Temps du slowmode',
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ],
    async runInteraction(client, interaction) {
        const value = interaction.options.getNumber("value");
        await interaction.channel.setRateLimitPerUser(value);

        if(value == 0){
            return interaction.reply({content : "🐇 Slowmode désactivé"});
        }else{
            return interaction.reply({content : `🐌 Slowmode activé - ${value} seconde${value > 1 ? "s" : ""}`});
        }
    }
};

