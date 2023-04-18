const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Perms = require('../../utils/Perms.js');

module.exports = {
    name: 'clear',
    category: 'moderation',
    permissions: [Perms.MANAGE_MESSAGES],
    ownerOnly: false,
    usage: 'clear [amount] <@user>',
    examples: ['clear 50', 'clear 15 @awake'],
    description: 'Clear a defined amount of messages or delete a defined amount of messages to a specific user.',
    options: [
        {
            name: 'amount',
            description: 'Amount of messages',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'member',
            description: 'Author of messages',
            type: ApplicationCommandOptionType.User,
            required: false,
        }
    ],
    async runInteraction(client, interaction, guildSettings) {
        const member = interaction.options.getMember("member");
        const amount = interaction.options.getNumber("amount");


        if (amount > 100 || amount < 2) return interaction.reply({  embeds: [AutoEmbed.sendErrorEmbed(`Invalid amount.`)], ephemeral: true });

        if (member) {
            const msgToDelete = await interaction.channel.messages.fetch();
            let i = 0;
            const filteredTargetMessages = [];
            (await msgToDelete).filter(msg => {
                if (msg.author.id == member.id && amount > i) {
                    filteredTargetMessages.push(msg);
                    i++;
                }
            });

            await interaction.channel.bulkDelete(filteredTargetMessages, true).then(async msg => {

                const embed = new EmbedBuilder()
                    .setTitle(`✏️ Channel cleared`)
                    .setThumbnail(member.displayAvatarURL())
                    .setColor("#F3AE0E")
                    .setDescription(`
    **User:** ${member}
    **ID:** ${member.id}
    **Channel:** ${interaction.channel}
    **Moderator:** ${interaction.user.tag}
    **Amount:** ${msg.size}`)
                    .setTimestamp();

                const logChannel = client.channels.cache.get(guildSettings.logChannel);
                if(logChannel) {
                    try{
                        logChannel.send({ embeds: [embed] });
                    }catch(e){}
                }


                const response = new EmbedBuilder()
                    .setColor("#5DBC4C")
                    .setDescription(`✅ Channel cleared\n👮‍♂️ User: ${member}\n✏️ Amount: ${msg.size}`);
                await interaction.reply({ embeds: [response], ephemeral: true });

            });

        } else {
            await interaction.channel.bulkDelete(amount, true).then(async msg => {

                const embed = new EmbedBuilder()
                    .setTitle(`✏️ Channel cleared`)
                    .setColor("#F3AE0E")
                    .setDescription(`
    **Channel:** ${interaction.channel}
    **Moderator:** ${interaction.user.tag}
    **Amount:** ${msg.size}`)
                    .setTimestamp();

                const logChannel = client.channels.cache.get(guildSettings.logChannel);
                if(logChannel) {
                    try{
                        logChannel.send({ embeds: [embed] });
                    }catch(e){}
                }


                const response = new EmbedBuilder()
                    .setColor("#5DBC4C")
                    .setDescription(`✅ Channel cleared\n✏️ Amount: ${msg.size}`);
                await interaction.reply({ embeds: [response], ephemeral: true });

            })
        }
    }
};

