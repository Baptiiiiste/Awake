const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'unmute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'unmute [@user]',
    examples: ['unmute @user'],
    description: 'Unmute un joueur du serveur.',
    options: [
        {
            name: 'user', 
            description: 'Utilisateur',
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember('user');

        if(!target.isCommunicationDisabled()) return interaction.reply("`ERREUR | Cet utilisateur n'est pas mute`");

        target.timeout(null);
        interaction.reply(`${target} a été unmute par ${interaction.member}`);
    }
};

