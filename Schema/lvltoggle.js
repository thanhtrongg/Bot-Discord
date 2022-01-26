const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    guildId: String,
    toggle: Number,
})

module.exports = mongoose.model('lvltoggles', Schema)