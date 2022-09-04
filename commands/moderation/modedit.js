const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');


module.exports = {
    name: 'modedit',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'modedit [case] [action] <reason>',
    examples: ['modedit 17 delete', 'modedit 5 reason Swearing'],
    description: 'Edit a case',
    options: [
        {
            name: "case",
            type: ApplicationCommandOptionType.Number,
            description: "Case to delete",
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
            description: "New reason of the case (Only if action is 'delete')",
            required: false
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const caseNumber = interaction.options.getNumber("case", true);
        const action = interaction.options.getString("action", true);
        const newreason = interaction.options.getString("reason");


        if(!caseNumber) return interaction.reply({ content: `❌ You must specify a case number.`, ephemeral: true });
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
            console.log("1");
            if(!newreason) return interaction.reply({ content: `❌ You must specify a new reason.`, ephemeral: true });
            console.log("2");
            // LIGNE A MODIF POUR EDIT LA RAISON DU CASE--  find one & update
            console.log("3");
            await client.updateGuild(interaction.guild, {users: guildSettings.users});
            console.log("4");


            const response = new EmbedBuilder()
                .setColor("#5DBC4C")
                .setDescription(`✅ Case ${caseNumber} was edited.\n➡️New reason: ${newreason}`);

            console.log("5");


            await interaction.reply({ embeds:[response], ephemeral: true });

            console.log("6");


        }
    }
};

