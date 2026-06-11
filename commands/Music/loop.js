const Discord = require('discord.js');

module.exports = {
    name: "loop",
    aliases: ['l', 'repeat', 'r'],
    description: "loops throught current song",

    async run (bot, message, args) {
        if(!message.member.voice.channel) return message.reply('Hãy vào kênh nói chuyện!');

        await bot.distube.setRepeatMode(message.guild, parseInt(args[0] || '1', 10));
        await message.channel.send("Lặp lại bài hát hiện tại!");
    }
}
