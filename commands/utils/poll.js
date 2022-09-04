const { EmbedBuilder } = require("discord.js");
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'poll',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'poll [question]',
    examples: ['poll Comment allez-vous ?'],
    description: 'Creer un sondage.',
    async run(client, message, args) {

        if(!args[0]) return message.reply("ERREUR | Question manquante");
        
        const embed = new EmbedBuilder()
            .setTitle("Sondage")
            .setColor("#00a3b5")
            .setDescription(args.splice(0).join(' '))
            .setTimestamp()
            .setFooter({text: `Sondage de ${message.author.tag}`});
        
        const poll = await message.reply({ embeds : [embed ]});
        poll.react("✅");
        poll.react("❌");
        
    },
    options: [
        {
            name: 'title', 
            description: 'Titre du sondage',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'content', 
            description: 'Question du sondage.',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async runInteraction(client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');

        const embed = new EmbedBuilder()
            .setTitle(pollTitle)
            .setColor("#00a3b5")
            .setDescription(pollContent)
            .setTimestamp()
            .setFooter({text: `Sondage de ${interaction.user.tag}`});
        
        const poll = await interaction.reply({ embeds : [embed], fetchReply: true });
        poll.react("✅");
        poll.react("❌");
    }
};

