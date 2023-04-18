const { EmbedBuilder } = require('discord.js');

function sendErrorEmbed(message){
    const embed = new EmbedBuilder()
    .setDescription(`❌ **${message}**`)
    .setColor('#ff0000')

    return embed;
}

function sendSuccessEmbed(message){
    const embed = new EmbedBuilder()
    .setDescription(`✅ **${message}**`)
    .setColor('#00ff00')

    return embed;
}

module.exports = { sendErrorEmbed, sendSuccessEmbed }