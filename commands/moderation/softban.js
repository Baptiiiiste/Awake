const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Perms = require('../../utils/Perms.js');
module.exports = {
    name: 'softban',
    category: 'moderation',
    permissions: [Perms.BAN_MEMBERS],
    ownerOnly: false,
    usage: 'softban [@user] <reason>',
    examples: ['softban @awake spam'],
    description: 'Kick someone from the server and delete his messages',
    options: [
        {
            name: "member",
            type: ApplicationCommandOptionType.User,
            description: "User to softban",
            required: true
        },
        {
            name: "reason",
            type: ApplicationCommandOptionType.String,
            description: "Reason",
            required: false
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const member = interaction.options.getMember("member", true);
        const reason = interaction.options.getString("reason") || "No reason given";

        if(!member) return interaction.reply({content: `❌ Member not found.`, ephemeral: true});
        if(!member.bannable) return interaction.reply({ content: `❌ Cannot softban this member.`, ephemeral: true });
        // await interaction.reply({content: `❌ I couldn't softban this member`, ephemeral: true});
        

        const embed = new EmbedBuilder()
            .setTitle(`⚒️ User softbanned from the server`)
            .setThumbnail(member.displayAvatarURL())
            .setColor("#ffb969")
            .setDescription(`
		**Member:** ${member.user.tag}
		**ID:** ${member.id}
		**Moderator:** ${interaction.user.tag}
		**Reason:** ${reason}`)
            .setTimestamp();
        

        const response = new EmbedBuilder()
            .setColor("#5DBC4C")
            .setDescription(`✅ User ${member} was softbanned from the server. \n➡️ Reason: ${reason}`);
                        
        await member.ban({deleteMessageDays: 7, reason: `${reason}`});
        
        try {await interaction.guild.members.unban(member.id)}
        catch(e){
            return interaction.reply({content: "❌ Error: Member not banned from the server", ephemeral: true})
        }
        const logChannel = client.channels.cache.get(guildSettings.logChannel);
        
        if(logChannel) logChannel.send({ embeds: [embed] });
        
        await interaction.reply({ embeds:[response], ephemeral: true });

    }
};

