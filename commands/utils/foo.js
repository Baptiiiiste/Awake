const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require("discord.js");
const { run } = require("./ping");

const buttons = new ActionRowBuilder()
    .addComponents(

        new ButtonBuilder()
            .setCustomId('primary-button')
            .setLabel("Primary")
            .setStyle(ButtonStyle.Primary),  

        new ButtonBuilder()
            .setCustomId('secondary-button')
            .setLabel("Secondary")
            .setStyle(ButtonStyle.Secondary), 
            
        new ButtonBuilder()
            .setCustomId('success-button')
            .setLabel("Success")
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId('danger-button')
            .setLabel("Danger")
            .setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
            .setURL("https://www.twitch.tv/")
            .setLabel("Link")
            .setStyle(ButtonStyle.Link),
    );

module.exports = {
    name: 'foo',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'foo',
    examples: ['foo'],
    description: 'foo',
    async run(client, message, args){
        message.channel.send({content: 'Cliquer sur les boutons', components: [buttons]});
    },
    async runInteraction(client, interaction)  {
        const msg = new EmbedBuilder()
            .setTitle("FOO !")
            .setDescription("Clique sur les boutons");
            
        await interaction.reply({embeds: [msg], components: [buttons]});
    }
};

