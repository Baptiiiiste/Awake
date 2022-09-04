const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'thread',
    category: 'thread',
    permissions: ['MANAGE_THREADS'],
    ownerOnly: false,
    usage: 'thread [join|leave|archive|unarchive|delete]',
    examples: ['thread join', 'thread delete'],
    description: 'Modifier les threads',
    options: [
        {
            name: 'join', 
            description: 'Joindre un thread',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'leave', 
            description: 'Quitter un thread',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'archive', 
            description: 'Archiver un thread',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'unarchive', 
            description: 'Désarchiver un thread',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'delete', 
            description: 'Supprimer un thread',
            type: ApplicationCommandOptionType.Subcommand,
            options: [ { name: 'channel', type: ApplicationCommandOptionType.String, description: 'Id du channel', required: true } ]
        }
    ],
    async runInteraction(client, interaction) {

        let thread = interaction.channel;
        if (!thread.isThread()) return interaction.reply("`ERREUR | Ce channel n'est pas un thread`");

        if(interaction.options.getSubcommand() === 'join'){
            interaction.reply("`Le bot a rejoint le thread `");
            if (thread.joinable) await thread.join();
        }else if(interaction.options.getSubcommand() === 'leave'){
            interaction.reply("`Le bot a quitté le thread `");
            await thread.leave();
        }else if(interaction.options.getSubcommand() === 'archive'){
            await interaction.reply("`Thread archivé`");
            await thread.setArchived(true);
        }else if(interaction.options.getSubcommand() === 'unarchive'){
            interaction.reply("`Thread desarchivé`");
            await thread.setArchived(false);
        }else if(interaction.options.getSubcommand() === 'delete'){
            const channelId = interaction.options.getString('channel');
            const logChannel = client.channels.cache.get(channelId);
            await logChannel.send("`Thread supprimé`");
            await thread.delete();
        }
    }
};

