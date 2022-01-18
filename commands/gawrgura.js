const Discord = require('discord.js')

module.exports = {
    name: "gawrgura",
    description: "xauhaydep command",

    async run (bot, message, args) {
        if(!args[0]) return message.reply('Opp. Hình như bên quên kèm theo câu hỏi rồi')
        let replies = ["Có"];
        
        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice().join(" ");

        let ballembed = new Discord.MessageEmbed()
        .setAuthor(`✅ ${message.author.username}`)
        .setColor("#1C1C1C")
        .addField("Câu Hỏi", question)
        .addField("Câu Trả Lời", replies[result])

        message.channel.send(ballembed)
    }
}