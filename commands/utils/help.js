const { EmbedBuilder } = require('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');
const { ApplicationCommandOptionType } = require('discord.js');


const contextDescription = {
    userinfo: 'Renvoie des informations sur l\'utilisateur'
}

module.exports = {
    name: 'help',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'help <command>',
    examples: ['help ping'],
    description: 'Affiche la page d\'aide',
    options: [
        {
            name: 'command', 
            description: 'Commande',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    async runInteraction(client, interaction, guildSettings)  {
        const prefix = guildSettings.prefix;
        const cmdName = interaction.options.getString('command');

        if(!cmdName){
            const noArgsEmbed = new EmbedBuilder()
                .setColor("#FD3333")
                .addFields([{name: '❓ |  HELP ', value: `Liste des commandes par catégorie. \`${prefix}help <command>\` pour plus d'informations `, inline: true}])
                

            for (const category of commandFolder){
                noArgsEmbed.addFields([{name: `${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`, value: `${prefix}${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(`, ${prefix}`)}`}])
            }
            return interaction.reply({embeds: [noArgsEmbed]});
        }

        const cmd = client.commands.get(cmdName);
        if(!cmd) return message.reply({content: "ERREUR | Commande inexistante"});
        
        return interaction.reply({ content: `
\`\`\`makefile
❓ | ${cmd.name.toUpperCase()} ${cmd.ownerOly ? '/!\\ Administrateur only' : ''}
${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}  

Utilisation: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.examples.join(` | ${prefix}`)}

Permissions: ${cmd.permissions.join(', ')}

Prefix: ${prefix} ou /
{} = sous-commande(s) disponible(s)
[] = option(s) obligatoire(s)
<> = option(s) optionnel(s)
\`\`\`
                `, ephemeral: true})

    }
};

