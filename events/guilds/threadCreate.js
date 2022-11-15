module.exports = {
    name: 'threadCreate',
    once: false,
    async execute(client, thread) {

        if (thread.joinable) {
            await thread.join();
        }

    }
}

