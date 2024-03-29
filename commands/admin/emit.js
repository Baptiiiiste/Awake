const { ApplicationCommandOptionType } = require('discord.js');
const Perms = require('../../utils/Perms.js');
module.exports = {
    name: 'emit',
    category: 'admin',
    permissions: [Perms.ADMINISTRATOR],
    ownerOnly: true,
    usage: 'emit [event]',
    examples: ['emit guildCreate'],
    description: 'Emit a specified event',
    run(client, message, args) {
        if (!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove|guildCreate)$/)) return message.reply({embeds: [AutoEmbed.sendErrorEmbed(`Invalid event (\`guildMemberAdd\`,\`guildMemberRemove\`,\`guildCreate\`).`)], ephemeral: true})
        
        if (args[0] == 'guildMemberAdd'){
            client.emit('guildMemberAdd', message.member);
            message.reply({content: 'Event guildMemberAdd emitted !', ephemeral: true});
        }else if (args[0] == 'guildCreate'){
            client.emit('guildCreate', message.guild);
            message.reply({content: 'Event guildCreate emitted !', ephemeral: true});
        }else if (args[0] == 'guildMemberRemove'){
            client.emit('guildMemberRemove', message.member);
            message.reply({content: 'Event guildMemberRemove emitted !', ephemeral: true});
        }
    
    
    },
    options: [
        {
            name: 'event', 
            description: 'Event to emit',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'guildMemberAdd',
                    value: 'guildMemberAdd'
                },
                {
                    name: 'guildMemberRemove',
                    value: 'guildMemberRemove'
                },
                {
                    name: 'guildCreate',
                    value: 'guildCreate'
                }
            ]
        }
    ],
    runInteraction(client, interaction) {
        const evtChoices = interaction.options.getString('event');
        
        if (evtChoices == 'guildMemberAdd'){
            client.emit('guildMemberAdd', interaction.member);
            interaction.reply({content: 'Event guildMemberAdd emitted !', ephemeral: true});
        }else if (evtChoices == 'guildMemberRemove'){
            client.emit('guildMemberRemove', interaction.member);
            interaction.reply({content: 'Event guildMemberRemove emitted !', ephemeral: true});
        }else if (evtChoices == 'guildCreate'){
            client.emit('guildCreate', interaction.guild);
            interaction.reply({content: 'Event guildCreate emitted !', ephemeral: true});
        }
    }
};

