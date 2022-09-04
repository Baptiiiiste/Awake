module.exports = {
    name: 'threadCreate',
    once: false,
    async execute(client, thread) {

        if(thread.isText()) thread.join();

        const logChannel = client.channels.cache.get("899935013490028554");
        logChannel.send(`Thread crée et rejoint: <#${thread.id}>`);
    }
}

