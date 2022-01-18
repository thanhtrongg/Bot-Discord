const Discord = require('discord.js')

module.exports = {
    name: "kick",
    description: "kick command",

    async run (bot, message, args) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Bạn không có quyền sử dụng lệnh!")

        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" "); //.kick <args(0) aka @member> | <args(1) aka reason>
        if (!reason) reason = "Không có lý do";

        const kickembed = new Discord.MessageEmbed()
        .setTitle(`Bạn bị kick bởi **${message.guild.name}**`)
        .setDescription(`Lý do: ${reason}`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())

        if (!args[0]) return message.channel.send("Bạn cần chỉ định một người để kick");

        if(!mentionMember) return message.channel.send("Người dùng này không tồn tại!");

        if(!mentionMember.kickable) return message.channel.send("Không thể đá người dùng này!");


        try {
            await mentionMember.send(kickembed);
        } catch (err) {

        }

        try {
            await mentionMember.kick(reason);
        } catch (err) {
            return message.channel.send("Không thể đá người dùng này...")
        }
    }
}