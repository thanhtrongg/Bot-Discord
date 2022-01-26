const Discord = require('discord.js')

module.exports = {
    name: "code",
    description: "xauhaydep command",

    async run (bot, message, args) {
        if(!args[0]) return message.reply('Opp. Hình như bên quên kèm theo câu hỏi rồi')
        let replies = [`Oke`];
        
        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice().join(" ");

        let ballembed = new Discord.MessageEmbed()
        .setColor("#1C1C1C")
        .addField("Trả lời", replies[result])

        message.channel.send(ballembed)
    }
}