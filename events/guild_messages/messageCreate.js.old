const ownerID = '338703558973194240';

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {

        let guildSettings = await client.getGuild(message.guild);
        
        if(!guildSettings){
            client.createGuild(message.guild);
            guildSettings = await client.getGuild(message.guild);
            return message.reply("`ERREUR | Mise à jour de la base de données, veuillez retaper la commande`");
        }
        
        const prefix = guildSettings.prefix;

        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmdName = args.shift().toLowerCase();

        if(cmdName.length == 0) return;

        let cmd = client.commands.get(cmdName);
        if (!cmd) return message.reply("`ERREUR | Cette commande n'existe pas !`");

        if(cmd.ownerOnly){
            if(message.author.id != ownerID) return message.reply("ERREUR | Permission manquante");
        }

        if(!message.member.permissions.has([cmd.permissions])) {
            return message.reply(`\`ERREUR | Permission(s) manquante(s): ${cmd.permissions.join(', ')}\``);
        }

        if (cmd) cmd.run(client, message, args, guildSettings);
    }   
}

