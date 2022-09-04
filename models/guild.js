const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    logChannel: { 'type': String, 'default': '' },
    users: { 'type': [], 'default': [] },
});

module.exports = mongoose.model('Guild', guildSchema);