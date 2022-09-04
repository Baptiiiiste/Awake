const mongoose = require('mongoose');


const guildSchema = mongoose.Schema({
    id: String,
    prefix: { 'type': String, 'default': '!' },
    logChannel: { 'type': String, 'default': '899935013490028554' },
    testChannel: { 'type': String, 'default': '809403773709582336' },
});

module.exports = mongoose.model('Guild', guildSchema);