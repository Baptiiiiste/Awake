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
            return message.reply({content: `❌ | Updating database, please retype the command`, ephemeral: true});

        }

        
        if(interaction.type === InteractionType.ApplicationCommand || interaction.isContextMenu()){
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd) return interaction.reply({content: `❌ This command does not exist`, ephemeral: true});

            if(cmd.ownerOnly){
                if(interaction.user.id != ownerID) return message.reply({content: "❌ You don't have the permission", ephemeral: true});
            }
            
            if(!interaction.member.permissions.has([cmd.permissions])) {
                return interaction.reply({ content: `❌ Missing permission(s): ${cmd.permissions.join(', ')}`, ephemeral: true});
            }
            
            cmd.runInteraction(client, interaction, guildSettings);
        
        } else if (interaction.isButton()){
            const btn = client.buttons.get(interaction.customId);
            if(!btn) return interaction.reply({content: "❌ This button does not exist", ephemeral:true});
            btn.runInteraction(client, interaction, guildSettings);

        }else if (interaction.isSelectMenu()){
            const slctMenu = client.selectMenu.get(interaction.customId);
            if(!slctMenu) return interaction.reply({content: "❌ This selectMenu does not exist", ephemeral: true});
            slctMenu.runInteraction(client, interaction, guildSettings);

        }
        
    }
}

