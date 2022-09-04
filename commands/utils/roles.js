const { ActionRowBuilder, SelectMenuBuilder, EmbedBuilder } = require("discord.js");

const selectMenu = new ActionRowBuilder()
    .addComponents(

        new SelectMenuBuilder()
            .setCustomId('roles-menu')
            .setPlaceholder('Choisir un rôle')
            .setMinValues(1)
            .setMaxValues(3)
            .addOptions([
                { label: "Admin", value: "809396652371869706", description:"Devenir admin" },
                { label: "Modérateur", value: "809396850205523988", description:"Devenir modérateur" },
                { label: "Membre", value: "809401861940576306", description:"Devenir membre" }
            ])
    );

module.exports = {
    name: 'roles',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'roles',
    examples: ['roles'],
    description: 'roles',
    async run(client, message, args){
        message.channel.send({content: 'CHOISIR SON ROLE', components: [selectMenu]});
    },
    async runInteraction(client, interaction)  {
        const msg = new EmbedBuilder()
            .setTitle("MENU ROLES !")
            .setDescription("CHOISIR SON ROLE");
            
        await interaction.reply({embeds: [msg], components: [selectMenu]});
    }
};

