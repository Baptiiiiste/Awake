const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'dbconfig',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'dbconfig [key] <value>',
    examples: ['dbconfig prefix ?', 'dbconfig prefix'],
    description: 'Configurer les données de la base de données.',
    options: [
        {
            name: 'key', 
            description: 'Choisir une clé à modifier/afficher',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "prefix",
                    value: "prefix"
                },
                {
                    name: "logChannel",
                    value: "logChannel"
                },
                {
                    name: "testChannel",
                    value: "testChannel"
                },
            ]
        },
        {
            name: 'value', 
            description: 'Choisir la nouvelle valeur.',
            type: ApplicationCommandOptionType.String,
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const key = interaction.options.getString('key');
        const value = interaction.options.getString('value');
        
        if (key == 'prefix'){

            if(value){
                await client.updateGuild(interaction.guild, {prefix: value});
                return interaction.reply({content: `Nouveau préfix: ${value}`});
            }

            interaction.reply({content: `Préfix: ${guildSettings.prefix}`});

        }else if (key == 'logChannel'){

            if(value){
                await client.updateGuild(interaction.guild, {logChannel: value});
                return interaction.reply({content: `Nouveau salon de log: <#${value}>`});
            }
            
            interaction.reply({content: `Salon de log: <#${guildSettings.logChannel}>`});
        }else if (key == 'testChannel'){

            if(value){
                await client.updateGuild(interaction.guild, {testChannel: value});
                return interaction.reply({content: `Nouveau salon de test: <#${value}>`});
            }
            
            interaction.reply({content: `Salon de test: <#${guildSettings.testChannel}>`});
        }
    }
};

