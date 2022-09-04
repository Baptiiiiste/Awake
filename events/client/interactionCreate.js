const { InteractionType } = require("discord.js");

const ownerID = '338703558973194240';

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {

        let guildSettings = await client.getGuild(interaction.guild);
        if(!guildSettings){
            client.createGuild(interaction.guild);
            guildSettings = await client.getGuild(interaction.guild);
            return message.reply("`ERREUR | Mise à jour de la base de données, veuillez retaper la commande`");

        }

        
        if(interaction.type === InteractionType.ApplicationCommand || interaction.isContextMenu()){
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd) return interaction.reply("`ERREUR | Cette commande n'existe pas !`");

            if(cmd.ownerOnly){
                if(interaction.user.id != ownerID) return message.reply("ERREUR | Permission manquante");
            }
            
            if(!interaction.member.permissions.has([cmd.permissions])) {
                return interaction.reply({ content: `\`ERREUR | Permission(s) manquante(s): ${cmd.permissions.join(', ')}\``, ephemeral: true});
            }
            
            cmd.runInteraction(client, interaction, guildSettings);
        
        } else if (interaction.isButton()){
            const btn = client.buttons.get(interaction.customId);
            if(!btn) return interaction.reply("`ERREUR | Ce bouton n'existe pas !`");
            btn.runInteraction(client, interaction, guildSettings);

        }else if (interaction.isSelectMenu()){
            const slctMenu = client.selectMenu.get(interaction.customId);
            if(!slctMenu) return interaction.reply("`ERREUR | Ce selectMenu n'existe pas !`");
            slctMenu.runInteraction(client, interaction, guildSettings);

        }
        
    }
}

