const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'clear',
    category: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'clear [nombre] <@user>',
    examples: ['clear 50', 'clear 15 @user'],
    description: 'Supprimer un nombre de message sur un salon ou un utilisateur.',
    options: [
        {
            name: 'message', 
            description: 'Nombre de message à supprimer',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'user', 
            description: 'Utilisateur à supprimer',
            type: ApplicationCommandOptionType.User,
            required: false,
        }
    ],
    async runInteraction(client, interaction) {
        const amountToDelete = interaction.options.getNumber('message');
        if( amountToDelete > 100 || amountToDelete < 0 ) return interaction.reply("`ERREUR | Nombre de message invalide ( 0> & <100 )`");
        const target =  interaction.options.getMember('user');
        
        const messagesToDelete = await interaction.channel.messages.fetch();
        if(target){
            let i = 0;
            const filteredTargetMessages = [];
            
            (await messagesToDelete).filter(msg => {
                if(msg.author.id == target.id && amountToDelete > i){
                    filteredTargetMessages.push(msg);
                    i++;
                }    
            });

            await interaction.channel.bulkDelete(filteredTargetMessages, true).then(messages =>{
                interaction.reply(`${messages.size} messages de ${target} supprimés`);
            })

        } else {
            interaction.channel.bulkDelete(amountToDelete, true).then(messages =>{
                interaction.reply(`${messages.size} messages supprimés`);
            })
        }
    }
};

