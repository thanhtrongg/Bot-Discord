const Discord = require('discord.js')

module.exports = {
    name: "command",
    description: "show command",

    async run (bot, message, args) {
        let member = message.mentions.users.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setTitle(`Lệnh Tấu Hài`)
        .setDescription( `>meme\n>xauhaydep <Câu hỏi>\n>gawrgura <Câu hỏi>\n>keobuabao\n>gay <tag tên>\n>ping || Check ping của máy\n>ban <Tag tên>\n>unban <ID người dùng>\n>kick <Tag tên>\n>mute <Tag tên>\n>unmute <Tag tên>\n>play <link hoặc tên bài hát>\n>leave(bot dừng phát nhạc)` )
        .setColor("GREEN")
        message.channel.send(howgayembed);
    }
}