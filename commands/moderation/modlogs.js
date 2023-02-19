const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Perms = require('../../utils/Perms.js');

module.exports = {
    name: 'modlogs',
    category: 'moderation',
    permissions: [Perms.MODERATE_MEMBERS],
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
        if (!member) return interaction.reply({ content: `❌ Member not found.`, ephemeral: true });

        const filteredUser = guildSettings.users.filter(u => u.id == member.id);
        if(filteredUser.length == 0) return interaction.reply({content: '❌ No logs found for this user.', ephemeral: true});

        let sanctionList = `\`${member.user.tag}\`'s logs: \n`;

        for(let sanction of filteredUser){
            sanctionList += `**[Case: ${sanction.case}] ${sanction.type}** - ${sanction.date}\n👮‍♂️ User: ${sanction.name} (${sanction.id})\n➡️ Reason: ${sanction.reason}\n👨‍⚖️ Moderator: ${sanction.moderator}\n\n`
        }

        await interaction.reply({ content: sanctionList, ephemeral: true });
    }
};

