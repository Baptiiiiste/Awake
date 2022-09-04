const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const dayjs = require("dayjs");
module.exports = {
    name: 'warn',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'warn [@user] [reason]',
    examples: ['warn @awake bad words'],
    description: 'UnMute someone',
    options: [
        {
            name: "member",
            type: ApplicationCommandOptionType.User,
            description: "User to unmute",
            required: true
        },
        {
            name: "reason",
            type: ApplicationCommandOptionType.String,
            description: "Reason for mute",
            required: false
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const member = interaction.options.getMember("member", true);
        const reason = interaction.options.getString("reason") || "No reason given";

        if (!member) return interaction.reply({ content: `❌ Member not found.`, ephemeral: true });
        if(!member.moderatable) return interaction.reply({ content: `❌ Cannot warn this member.`, ephemeral: true });


        const embed = new EmbedBuilder()
            .setTitle(`⚒️ User warned from the server`)
            .setThumbnail(member.displayAvatarURL())
            .setColor("#F7E405")
            .setDescription(`
		**Member:** ${member.user.tag}
		**ID:** ${member.id}
		**Moderator:** ${interaction.user.tag}
		**Reason:** ${reason}`)
            .setTimestamp();

        const response = new EmbedBuilder()
            .setColor("#5DBC4C")
            .setDescription(`✅ User ${member} was warned from the server. \n➡️ Reason: ${reason}`);

        const logChannel = client.channels.cache.get(guildSettings.logChannel);
        if(logChannel) logChannel.send({ embeds: [embed] });

        await interaction.reply({ embeds:[response], ephemeral: true });


        const userArray = guildSettings.users;
        const cases = guildSettings.users.map(u => u.case);
        const highestCase = Math.max(...cases);
        const user = {
            case: (cases.length === 0 ? 0 : highestCase + 1),
            type: "Warn",
            name: member.user.tag,
            id: member.id,
            moderator: interaction.user.tag,
            reason: reason,
            date: dayjs().format("DD/MM/YYYY - HH:mm")
        }

        userArray.push(user);
        await client.updateGuild(interaction.guild, {users: userArray});

    }
};

