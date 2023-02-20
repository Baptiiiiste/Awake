const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Perms = require('../../utils/Perms.js');
module.exports = {
    name: 'kick',
    category: 'moderation',
    permissions: [Perms.KICK_MEMBERS],
    ownerOnly: false,
    usage: 'kick [@user] [reason]',
    examples: ['kick @awake Get out of here !'],
    description: 'Kick someone from the server',
    options: [
        {
            name: 'member',
            description: 'User to kick',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'reason', 
            description: 'Reason',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async runInteraction(client, interaction, guildSettings) {

        const member = interaction.options.getMember("member", true);
        const reason = interaction.options.getString("reason") || "No reason given";

        if(!member) return interaction.reply({content: `❌ Member not found.`, ephemeral: true});

        if(!member.kickable) return interaction.reply({ content: `❌ Cannot kick this member.`, ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle(`⚒️ User kicked from the server`)
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
            .setDescription(`✅ User ${member} was kicked from the server. \n➡️ Reason: ${reason}`);

        await member.kick(reason);
        const logChannel = client.channels.cache.get(guildSettings.logChannel);
        if(logChannel) {
            try{
                logChannel.send({ embeds: [embed] });
            }catch(e){}
        }

        await interaction.reply({embeds: [response], ephemeral: true});

    }
};

