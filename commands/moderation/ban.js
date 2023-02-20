const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const dayjs = require('dayjs')
const Perms = require('../../utils/Perms.js');

module.exports = {
    name: 'ban',
    category: 'moderation',
    permissions: [Perms.BAN_MEMBERS],
    ownerOnly: false,
    usage: 'ban [@user] [reason]',
    examples: ['ban @awake Swearing'],
    description: 'Ban someone from the server.',
    options: [
        {
            name: 'member',
            description: 'Member to ban',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'reason', 
            description: 'Reason',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const member = interaction.options.getMember("member", true);
        const reason = interaction.options.getString("reason") || "No reason given";

        if (!member) return interaction.reply({ content: `❌ Member not found.`, ephemeral: true });

        if(!member.bannable) return interaction.reply({ content: `❌ Cannot ban this member.`, ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle(`⚒️ User banned from the server`)
            .setThumbnail(member.displayAvatarURL())
            .setColor("#FB3C3C")
            .setDescription(`
		**Member:** ${member.user.tag}
		**ID:** ${member.id}
		**Moderator:** ${interaction.user.tag}
		**Reason:** ${reason}`)
            .setTimestamp();

        const response = new EmbedBuilder()
            .setColor("#5DBC4C")
            .setDescription(`✅ User ${member} was banned from the server. \n➡️ Reason: ${reason}`);


        await member.ban({ reason });
        const logChannel = client.channels.cache.get(guildSettings.logChannel);
        if(logChannel) {
            try{
                logChannel.send({ embeds: [embed] });
            }catch(e){}
        }
            

        await interaction.reply({ embeds:[response], ephemeral: true });

        const userArray = guildSettings.users;
        const cases = guildSettings.users.map(u => u.case);
        const highestCase = Math.max(...cases);
        const user = {
            case: (cases.length === 0 ? 0 : highestCase + 1),
            type: "Ban",
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

