const Discord = require('discord.js');

module.exports = {
    name: "stop",
    description: "stops playing a song!",

    async run (bot, message, args) {
        if(!message.member.voice.channel) return message.reply('Hãy vào kênh nói chuyện!');
        
        await bot.distube.stop(message)
        await message.channel.send("**Dừng nghe nhạc!**")
    }
}