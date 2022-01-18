const Discord = require('discord.js')

module.exports = {
    name: "xauhaydep",
    description: "xauhaydep command",

    async run (bot, message, args) {
        if(!args[0]) return message.reply('Opp. Hình như bên quên kèm theo câu hỏi rồi')
        let replies = ["Có", "Không tệ", "Hmmm xấu", "Tuyệt đẹp", "Không", "Tốt hơn là tôi không nên nói", "Như con kẹc", "Xấu vcl", "Quỷ tha ma", "Tôi không biết nên miêu tả thế nào về vẻ đẹp của bạn. Tuyệt!", "Bạn sẽ không vui vì câu trả lời này", "Đm xấu vl", "Mặt bạn như mặt chó", "Bạn rất đẹp", "Nét đẹp của bạn tôi không thể nào diễn tả được", "Cút xấu vãi loz", "Mẹ kiệp xấu như cờ hó", "Có vẻ đẹp!", "Tôi e là tôi không thể trả lời được"];
        
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