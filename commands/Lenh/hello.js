const Discord = require('discord.js');

module.exports = {

    name: "hello",
    run : async (bot, message, args) => {
        message.channel.send('Hello')
    }
}
