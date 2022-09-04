const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'ban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ban [@user] [reason]',
    examples: ['ban @user raison'],
    description: 'Bannir un joueur du serveur.',
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

        if(!target.bannable) return interaction.reply("`ERREUR | Cet utilisateur ne peut pas être exclu`");

        target.ban(reason);
        interaction.reply(`${target} a été banni pour \`${reason}\` par ${interaction.member}`);
    }
};

