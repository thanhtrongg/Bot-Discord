const db = require('quick.db')

module.exports = {
    name: 'antispam',
    description: "Anti Spam",

    run : async(bot, message, args) => {
        if(args[0] === 'on'){
            await db.set(`antispam-${message.guild.id}`, true)
            message.channel.send('Đã bật chức năng chống spam')
        } else if(args[0] === 'off') {
            await db.set(`antispam-${message.guild.id}`, false)
            message.channel.send('Đã tắt chức năng chống spam')
        }
    }
}