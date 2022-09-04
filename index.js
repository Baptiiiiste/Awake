const { Client, Collection, Partials } = require('discord.js');
const client = new Client( { intents: 1539, partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User] } );
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Logger = require("./utils/Logger");


['commands', 'buttons', 'selectMenu'].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'SelectMenuUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });
require('./utils/Functions')(client);


process.on('exit', code => { Logger.client(`Process stopped: ${code}`); });

process.on('uncaughtException', (err, origin) => { 
    Logger.error(`uncaughtException: ${err}`); 
    console.error(`Origin: ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => { 
    Logger.warn(`unhandledRejection: ${reason}`); 
    console.log(promise);
});

process.on('warning', (...args) => { Logger.warn(...args); });


mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).then(() => { Logger.client('Database connected') })
.catch(err => { Logger.error(err)});

client.login(process.env.DISCORD_TOKEN);