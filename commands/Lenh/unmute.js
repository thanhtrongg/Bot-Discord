const { Message } = require('discord.js')

module.exports=  {
    name : 'unmute', 
    /**
     * @param {Message} message
     */
    run : async(bot, message, args) => {
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Không tìm thấy người dùng')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`${Member.displayName} đã được unmuted`)
    }
}