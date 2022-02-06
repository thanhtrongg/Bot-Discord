var Discord = require('discord.js');

var ms = require('ms');

module.exports = {
    name : 'mute',

    run : async(bot, msg, args) => {
        if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('Bạn không có quyền sử dụng lệnh!');
    
        var user = msg.mentions.users.first();
        if(!user) return msg.reply('Bạn chưa tag thành viên!');
    
        var member;
    
        try {
            member = await msg.guild.members.fetch(user);
        } catch(err) {
            member = null;
        }
    
        if(!member) return msg.reply('Không tìm thấy thành viên!');
        if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('Bạn không thể mute người này!');
    
        var rawTime = args[1];
        var time = ms(rawTime);
        if(!time) return msg.reply('Bạn chưa nhập thời gian mute!');
    
        var reason = args.splice(2).join(' ');
        if(!reason) return msg.reply('Bạn cần phải nhập lý do!');
    
        var channel = msg.guild.channels.cache.find(c => c.name === 'mute');
    
        var log = new Discord.MessageEmbed()
        .setTitle('Thành viên bị Muted')
        .addField('Thành viên:', user, true)
        .addField('Bởi:', msg.author, true)
        .addField('Thời gian bị muted:', rawTime)
        .addField('Lý do:', reason)
        msg.channel.send(log);
    
        var embed = new Discord.MessageEmbed()
        .setTitle('Bạn đã bị muted!')
        .addField('Thời gian bị muted:', rawTime, true)
        .addField('Lý do:', reason, true);
    
        try {
            user.send(embed);
        } catch(err) {
            console.warn(err);
        }
    
        var role = msg.guild.roles.cache.find(r => r.name === 'muted');
    
        member.roles.add(role);
    
        setTimeout(async() => {
            member.roles.remove(role);
        }, time);
    
        //msg.channel.send(`**${user}** đã bị muted bời **${msg.author}** trong vòng **${rawTime}**!`);
    }
}