const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'ping',
    examples: ['ping'],
    description: 'Affiche le ping du bot et son uptime',
    async run(client, message, args) {

        const chargement = await message.channel.send(':ping_pong: Chargement ...');

        const embed = new EmbedBuilder()
            .setTitle(":ping_pong: Pong !")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                {name: "Latence API", value: `\`${client.ws.ping} ms\``, inline: true},
                {name: "Latence BOT", value: `\`${chargement.createdTimestamp - message.createdTimestamp} ms\``, inline: true}
            ])
            .setTimestamp()
            .setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL()});


        chargement.edit({content: null, embeds: [embed]});
    },
    async runInteraction(client, interaction)  {

        const chargement = await interaction.reply({content: ':ping_pong: Chargement ...', fetchReply: true});

        const embed = new EmbedBuilder()
            .setTitle(":ping_pong: Pong !")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                {name: "Latence API", value: `\`${client.ws.ping} ms\``, inline: true},
                {name: "Latence BOT", value: `\`${chargement.createdTimestamp - interaction.createdTimestamp} ms\``, inline: true}
            ])
            .setTimestamp()
            .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()});

        interaction.editReply({content: null, embeds: [embed]})
    }
};

