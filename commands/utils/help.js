const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Perms = require('../../utils/Perms.js');

const contextDescription = {
    userinfo: 'Send user\'s informations'
}

module.exports = {
    name: 'help',
    category: 'utils',
    permissions: [Perms.SEND_MESSAGES],
    ownerOnly: false,
    usage: 'help <command>',
    examples: ['help ping'],
    description: 'Here to help ya',
    options: [
        {
            name: 'command', 
            description: 'Command',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    async runInteraction(client, interaction, guildSettings)  {
        const cmdName = interaction.options.getString('command');

        if(!cmdName){
            const noArgsEmbed = new EmbedBuilder()
                .setColor("#FD3333")
                .addFields([{name: '❓ |  HELP ', value: `List of commands. \`/help <command>\` for more informations `, inline: true}])
                

            for (const category of commandFolder){
                noArgsEmbed.addFields([{name: `${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`, value: `/${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(`, /`)}`}])
            }
            return interaction.reply({embeds: [noArgsEmbed]});
        }

        const cmd = client.commands.get(cmdName);
        if(!cmd) return message.reply({content: "ERROR | Invalid command"});
        
        return interaction.reply({ content: `
\`\`\`makefile
❓ | ${cmd.name.toUpperCase()} ${cmd.ownerOnly ? '/!\\ Administrator only' : ''}
${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}  

Usage: /${cmd.usage}
Examples: /${cmd.examples.join(` | /`)}

Permissions: ${cmd.permissions.join(', ')}

Prefix: /
{} = subcommand(s) available(s)
[] = option(s) available(s)
<> = option(s) optional(s)
\`\`\`
                `, ephemeral: true})

    }
};

