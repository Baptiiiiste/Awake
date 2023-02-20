const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { Guild } = require('../../models/index')
const Perms = require('../../utils/Perms.js');

module.exports = {
    name: 'modedit',
    category: 'moderation',
    permissions: [Perms.MODERATE_MEMBERS],
    ownerOnly: false,
    usage: 'modedit [case] [action] <reason>',
    examples: ['modedit 17 delete', 'modedit 5 reason Swearing'],
    description: 'Edit a case',
    options: [
        {
            name: "case",
            type: ApplicationCommandOptionType.Number,
            description: "Case to edit",
            required: true
        },
        {
            name: "action",
            type: ApplicationCommandOptionType.String,
            description: "Action to take (delete/reason)",
            required: true
        },
        {
            name: "reason",
            type: ApplicationCommandOptionType.String,
            description: "New reason of the case (Only if action is 'reason')",
            required: false
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const caseNumber = interaction.options.getNumber("case", true);
        const action = interaction.options.getString("action", true);
        const newreason = interaction.options.getString("reason");

        if(!caseNumber && caseNumber !== 0) return interaction.reply({ content: `❌ You must specify a case number.`, ephemeral: true });
        if(!action) return interaction.reply({ content: `❌ You must specify an action (delete, reason).`, ephemeral: true });


        const filteredCase = guildSettings.users.map(c => c.case).indexOf(caseNumber);
        if (filteredCase == -1) return interaction.reply({ content: `❌ Case not found.`, ephemeral: true });


        if(action == "delete" || action == "del"){
            guildSettings.users.splice(filteredCase, 1);
            await client.updateGuild(interaction.guild, {users: guildSettings.users});

            const response = new EmbedBuilder()
                .setColor("#5DBC4C")
                .setDescription(`✅ Case ${caseNumber} was deleted.`);

            await interaction.reply({ embeds:[response], ephemeral: true });

        }else if(action == "reason"){
            if(!newreason) return interaction.reply({ content: `❌ You must specify a new reason.`, ephemeral: true });
            guildSettings.users[filteredCase].reason = newreason;

            await client.updateGuild(interaction.guild, {users: guildSettings.users});

            const response = new EmbedBuilder()
                .setColor("#5DBC4C")
                .setDescription(`✅ Case ${caseNumber} was edited.\n➡️New reason: ${newreason}`);

            await interaction.reply({ embeds:[response], ephemeral: true });

        }else{
            await interaction.reply({ content: `❌ You must specify a valid action (delete, reason).`, ephemeral: true })
            return
        }

        const logResponse = new EmbedBuilder()
        .setColor("#DF9400")
        .setTitle(`⚒️ Case Edited`)
        .setDescription(`
**Case:** ${caseNumber}
**Action:** ${action}
**Moderator:** ${interaction.user.tag}
${newreason ? `**New reason:** ${newreason}` : ""}
        `)
        .setTimestamp();
        const logChannel = client.channels.cache.get(guildSettings.logChannel);
        if(logChannel) {
            try{
                logChannel.send({ embeds: [logResponse] });
            }catch(e){}
        }

    }
};

