const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'kick',
    category: 'moderation',
    permissions: ['KICK_MEMBERS'],
    ownerOnly: false,
    usage: 'kick [@user] [reason]',
    examples: ['kick @user raison'],
    description: 'Exclure un joueur du serveur.',
    options: [
        {
            name: 'user', 
            description: 'Utilisateur',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'reason', 
            description: 'Raison',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');

        if(!target.kickable) return interaction.reply("`ERREUR | Cet utilisateur ne peut pas être exclu`");

        target.kick(reason);
        interaction.reply(`${target} a été exclu pour \`${reason}\` par ${interaction.member}`);
    }
};

