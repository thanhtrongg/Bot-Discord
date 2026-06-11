const mongoose = require('mongoose');

const guildSettingsSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    antispam: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('guild_settings', guildSettingsSchema);
