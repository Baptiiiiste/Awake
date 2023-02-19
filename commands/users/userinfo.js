const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Perms = require('../../utils/Perms.js');
module.exports = {
    name: 'userinfo',
    category: 'users',
    permissions: [Perms.SEND_MESSAGES],
    ownerOnly: false,
    usage: 'userinfo [@user]',
    examples: ['userinfo @Awake'],
    description: 'Get the user informations',
    options: [
        {
            name: 'member',
            description: 'User to kick',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
    async runInteraction(client, interaction, guildSettings) {
        // const member = await interaction.guild.members.fetch(interaction.targetId);
        const member = interaction.options.getMember("member", true);

        const embed = new EmbedBuilder()
            .setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://images.emojiterra.com/twitter/512px/1f916.png' : 'https://images.emojiterra.com/twitter/v13.1/512px/1f9d1.png'})
            .setColor("#8e48f7")
            .setThumbnail(member.user.displayAvatarURL())
            .addFields([
                {name: 'Name', value: `${member.displayName}`, inline: true},
                {name: 'Moderator', value: `${member.kickable ? '❌': '✅'}`, inline: true},
                {name: 'Bot', value: `${member.user.bot ? '✅': '❌'}`, inline: true},
                {name: 'Roles', value: `${member.roles.cache.map(role => role).join(', ').replace(', @everyone', ' ')}`},
                {name: 'Account created', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`},
                {name: 'Server joined', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`}
            ])


        await interaction.reply({embeds: [embed], ephemeral: true})
    }
};

