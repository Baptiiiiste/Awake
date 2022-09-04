const Logger = require('../../utils/Logger');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        let guildsCount = await client.guilds.fetch();
        let usersCount = await client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        Logger.client(`Connecté en tant que ${client.user.tag} sur ${guildsCount.size} serveur${guildsCount.size > 1 ? "s" : ""}`);

        client.user.setPresence({ activities : [{name: `${usersCount} membre${usersCount > 1 ? "s" : ""} sur ${guildsCount.size} serveur${guildsCount.size > 1 ? "s" : ""}`, type:'WATCHING'}], status: 'online' });

        const devGuild = await client.guilds.cache.get('807658249728950292');
        devGuild.commands.set(client.commands.map(cmd => cmd));
    }
}

