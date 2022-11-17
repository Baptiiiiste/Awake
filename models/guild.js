const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    logChannel: { 'type': String, 'default': '' },
    lockdown: { 'type': Boolean, 'default': false },
    users: { 'type': [], 'default': [] },
});

module.exports = mongoose.model('Guild', guildSchema);