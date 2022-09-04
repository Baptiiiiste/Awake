const ms = require("ms");
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'mute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'mute [@user] [duration] [reason]',
    examples: ['mute @user 10m raison'],
    description: 'Mute un joueur du serveur.',
    options: [
        {
            name: 'user', 
            description: 'Utilisateur',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'duration', 
            description: 'Durée',
            type: ApplicationCommandOptionType.String,
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
        const duration = interaction.options.getString('duration');
        const convertedTime = ms(duration)
        const reason = interaction.options.getString('reason');

        if(!target.moderatable) return interaction.reply("`ERREUR | Cet utilisateur ne peut pas être mute`");
        if(!convertedTime) return interaction.reply("`ERREUR | Durée sélectionnée invalide`");

        target.timeout(convertedTime, reason);
        interaction.reply(`${target} a été mute pendant \`${duration}\` pour \`${reason}\` par ${interaction.member}`);
    }
};

