const Logger = require('../../utils/Logger');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        let guildsCount = await client.guilds.fetch();
        let usersCount = await client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        guildsCount.forEach(async guild => {
            const isGuildExistingInDB = await client.getGuild(guild);
            if(!isGuildExistingInDB) await client.createGuild(guild);
        });

        Logger.client(`Logged in as ${client.user.tag} on ${guildsCount.size} server${guildsCount.size > 1 ? "s" : ""}`);

        client.user.setPresence({ activities : [{name: `${usersCount} member${usersCount > 1 ? "s" : ""} on ${guildsCount.size} server${guildsCount.size > 1 ? "s" : ""}`, type:'WATCHING'}], status: 'online' });

        const devGuild = await client.guilds.cache.get('807658249728950292');
        devGuild.commands.set(client.commands.map(cmd => cmd));
    }
}

