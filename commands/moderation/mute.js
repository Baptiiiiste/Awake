const ms = require("ms");
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const dayjs = require('dayjs')

module.exports = {
    name: 'mute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'mute [@user] [duration] [reason]',
    examples: ['mute @user 10m bad words'],
    description: 'Mute someone',
    options: [
        {
            name: "member",
            type: ApplicationCommandOptionType.User,
            description: "User to mute",
            required: true
        },
        {
            name: "duration",
            type: ApplicationCommandOptionType.String,
            description: "Duration of the sanction",
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
        const duration = interaction.options.getString("duration");
        const convertedTime = ms(duration);
        const reason = interaction.options.getString("reason") || "No reason given";


        if (!member) return interaction.reply({ content: `❌ Member not found.`, ephemeral: true });
        if (!convertedTime) return interaction.reply({ content: `❌ You must set a valid duration for the mute.`, ephemeral: true });
        if (!member.moderatable) return interaction.reply({ content: `❌ Cannot mute this member.`, ephemeral: true });


        const response = new EmbedBuilder()
            .setColor("#5DBC4C")
            .setDescription(`✅ User ${member} was muted from the server. \n➡️ Reason: ${reason}\n⏰ Duration: ${duration}`);

        const embed = new EmbedBuilder()
            .setTitle(`⚒️ User muted from the server`)
            .setThumbnail(member.displayAvatarURL())
            .setColor("#15DC94")
            .setDescription(`
**Member:** ${member.user.tag}
**ID:** ${member.id}
**Moderator:** ${interaction.user.tag}
**Reason:** ${reason}
**Duration:** ${duration}`)
            .setTimestamp();

        await interaction.reply({ embeds: [response], ephemeral: true });
        const logChannel = client.channels.cache.get(guildSettings.logChannel);
        if(logChannel) logChannel.send({ embeds: [embed] });



        const userArray = guildSettings.users;
        const cases = guildSettings.users.map(u => u.case);
        const highestCase = Math.max(...cases);
        const user = {
            case: (cases.length === 0 ? 0 : highestCase + 1),
            type: "Mute",
            name: member.user.tag,
            id: member.id,
            moderator: interaction.user.tag,
            reason: reason,
            date: dayjs().format("DD/MM/YYYY - HH:mm")
        }

        userArray.push(user);
        await client.updateGuild(interaction.guild, { users: userArray });

        await member.timeout(convertedTime, reason);
    }
};

