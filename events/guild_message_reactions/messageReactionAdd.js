const Logger = require("../../utils/Logger")

module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(client, messageReaction, user) {

        const message = messageReaction.message;
        const emojiName = messageReaction.emoji.name;
        const member = message.guild.members.cache.get(user.id);

        if(member.user.bot) return;

        if(messageReaction.partial) {
            try {
                await messageReaction.fetch();
            } catch (error) {
                Logger.error("Cannot get the messages")
                return;
            }
        }

        // if(emojiName === '✅') member.send("Hi !");
        // if(emojiName === '❌') message.delete();
        // if(emojiName === '🟦') message.reactions.removeAll();

    }   
}

