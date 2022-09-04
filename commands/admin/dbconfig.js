const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'dbconfig',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: false,
    usage: 'dbconfig [key] <value>',
    examples: ['dbconfig logChannel 2165746146461', 'dbconfig logChannel'],
    description: 'Configure data in the database',
    options: [
        {
            name: 'key', 
            description: 'Key to edit',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "logChannel",
                    value: "logChannel"
                },
            ]
        },
        {
            name: 'value', 
            description: 'Choose the new key',
            type: ApplicationCommandOptionType.String,
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const key = interaction.options.getString('key');
        const value = interaction.options.getString('value');
        
       if (key == 'logChannel'){

            if(value){
                await client.updateGuild(interaction.guild, {logChannel: value});
                return interaction.reply({content: `New logs channel: <#${value}>`});
            }
            
            interaction.reply({content: `Logs channel: <#${guildSettings.logChannel}>`});
        }
    }
};

