const Discord = require('discord.js');

module.exports = {
    name: "play",
    aliases: ['p'],
    description: "play a song!",

    async run (bot, message, args) {
        if(!message.member.voice.channel) return message.reply('Hãy vào kênh nói chuyện!');

        const music = args.join(" "); //.play <args (song name)>
        if(!music) return message.reply("Ghi tên bài hát hoặc link bài hát!");

        await bot.distube.play(message, music)
    }
}