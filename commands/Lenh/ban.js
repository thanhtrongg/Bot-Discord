const Discord = require('discord.js')

module.exports = {
    name: "ban",
    description: "ban command",

    async run (bot, message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Bạn không có quyền sử dụng lệnh!")

        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" "); //.ban <args(0) aka @member> | <args(1) aka reason>
        if (!reason) reason = "Không có lý do";

        const embed = new Discord.MessageEmbed()
        .setTitle(`Bạn bị ban bởi **${message.guild.name}**`)
        .setDescription(`Lý do: ${reason}`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())

        if (!args[0]) return message.channel.send("Bạn cần chỉ định một người để ban");

        if(!mentionMember) return message.channel.send("Người dùng này không tồn tại!");

        if(!mentionMember.bannable) return message.channel.send("Không thể ban người dùng này");

        await mentionMember.send(embed);
        await mentionMember.ban({
            reason: reason
        }).then(() => message.channel.send("Ban thành công: " + mentionMember.user.tag));
    }
}