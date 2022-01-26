const discord = require('discord.js')

module.exports = {
    name: "report",
    aliases: [],

    run : async (bot, message, args) => {
    
        let user = message.mentions.users.first()
        if (!user) return message.channel.send('Tag người cần báo cáo!')
    
        let reason = args.slice(1).join(" ")
        if (!reason) return message.channel.send("Cung cấp lý do báo cáo!")
    
        let Avatar = user.displayAvatarURL();
        let Channel = message.guild.channels.cache.find((ch) => ch.name === "reports") 
        if (!Channel) return message.channel.send("Không có kênh nào được gọi là báo cáo, vui lòng liên hệ với mod hoặc tạo một kênh có tên là `reports`");
    
        const embed = new discord.MessageEmbed()
        .setTitle('Báo cáo mới!')
        .setDescription(`Người dùng \`${message.author.tag}\` đã người báo cáo người dùng \`${user.tag}\`!`)
        .setColor("RED")
        .setThumbnail(Avatar)
        .addFields(
            { name: "Người dùng ID", value: `${message.author.id}`, inline: true},
            { name: "Người dùng Tag", value: `${message.author.tag}`, inline: true},
            { name: "Báo cáo ID", value: `${user.id}`, inline: true},
            { name: "Báo cáo Tag", value: `${user.tag}`, inline: true},
            { name: "Lý do", value: `${reason}`, inline: true}
        )
        Channel.send("<@786586849484341269>")
        Channel.send(embed)
        message.channel.send('Đã gửi báo cáo thành công, vui lòng chờ 1 đến 24 giờ để admin xem xét!')
        message.channel.send('Đọc đơn báo cáo tại đây 👉 <#932622970294263898>')
    
    }
}