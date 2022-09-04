const { EmbedBuilder } = require('discord.js');
const { ApplicationCommandType } = require('discord.js');

module.exports = {
    name: 'userinfo',
    category: 'users',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'userinfo',
    examples: ['userinfo'],
    type: ApplicationCommandType.User,
    async runInteraction(client, interaction) {

        const member = await interaction.guild.members.fetch(interaction.targetId);

        const embed = new EmbedBuilder()
            .setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://images.emojiterra.com/twitter/512px/1f916.png' : 'https://images.emojiterra.com/twitter/v13.1/512px/1f9d1.png'})
            .setColor("#8e48f7")
            .setThumbnail(member.user.displayAvatarURL())
            .addFields([
                {name: 'Nom', value: `${member.displayName}`, inline: true},
                {name: 'Modérateur', value: `${member.kickable ? '❌': '✅'}`, inline: true},
                {name: 'Bot', value: `${member.user.bot ? '✅': '❌'}`, inline: true},
                {name: 'Roles', value: `${member.roles.cache.map(role => role).join(', ').replace(', @everyone', ' ')}`},
                {name: 'Compte crée le', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`},
                {name: 'Serveur rejoint le', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`}
            ])


        interaction.reply({embeds: [embed], ephemeral: true})
    }
};

