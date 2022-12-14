const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');


module.exports = {
    name: 'modlogs',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'modedit [@user]',
    examples: ['modlogs @awake'],
    description: 'Search logs for a specific user',
    options: [
        {
            name: "member",
            type: ApplicationCommandOptionType.User,
            description: "User to search for",
            required: true
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const member = interaction.options.getMember("member", true);
        if (!member) return interaction.reply({ content: `ā Member not found.`, ephemeral: true });

        const filteredUser = guildSettings.users.filter(u => u.id == member.id);
        if(filteredUser.length == 0) return interaction.reply({content: 'ā No logs found for this user.', ephemeral: true});

        let sanctionList = `\`${member.user.tag}\`'s logs: \n`;

        for(let sanction of filteredUser){
            sanctionList += `**[Case: ${sanction.case}] ${sanction.type}** - ${sanction.date}\nš®āāļø User: ${sanction.name} (${sanction.id})\nā”ļø Reason: ${sanction.reason}\nšØāāļø Moderator: ${sanction.moderator}\n\n`
        }

        await interaction.reply({ content: sanctionList, ephemeral: true });
    }
};

