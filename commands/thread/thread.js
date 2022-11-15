const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'thread',
    category: 'thread',
    permissions: ['MANAGE_THREADS'],
    ownerOnly: false,
    usage: 'thread [join|leave|archive|unarchive|delete]',
    examples: ['thread join', 'thread delete'],
    description: 'Edit threads',
    options: [
        {
            name: 'join', 
            description: 'Join a thread',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'leave', 
            description: 'Leave a thread',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'archive', 
            description: 'Archive a thread',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'unarchive', 
            description: 'Unarchive a thread',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'delete', 
            description: 'Delete a thread',
            type: ApplicationCommandOptionType.Subcommand,
            options: [ { name: 'channel', type: ApplicationCommandOptionType.String, description: 'Channel\'s id', required: true } ]
        }
    ],
    async runInteraction(client, interaction) {

        let thread = interaction.channel;
        if (!thread.isThread()) return interaction.reply({content: `❌ This channel isn't a thread`, ephemeral: true});

        if(interaction.options.getSubcommand() === 'join'){
            interaction.reply({content: "✅ The bot joined the thread", ephemeral: true});
            if (thread.joinable) await thread.join();
        }else if(interaction.options.getSubcommand() === 'leave'){
            interaction.reply({content: "✅ The bot left the thread", ephemeral: true});
            await thread.leave();
        }else if(interaction.options.getSubcommand() === 'archive'){
            await interaction.reply({content: "✅ Thread archived", ephemeral: true});
            await thread.setArchived(true);
        }else if(interaction.options.getSubcommand() === 'unarchive'){
            await interaction.reply({content: "✅ Thread unarchived", ephemeral: true});
            await thread.setArchived(false);
        }else if(interaction.options.getSubcommand() === 'delete'){
            const channelId = interaction.options.getString('channel');
            const logChannel = client.channels.cache.get(channelId);
            await logChannel.send({content: "✅ Thread deleted", ephemeral: true});
            await thread.delete();
        }
    }
};

