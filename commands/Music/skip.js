const Discord = require('discord.js');

module.exports = {
    name: "skip",
    description: "skips the current song in the queue",

    async run (bot, message, args) {
        if(!message.member.voice.channel) return message.reply('Hãy vào kênh nói chuyện!');

        await bot.distube.skip(message)
        await message.channel.send("Bỏ qua bài hát!")
    }
}