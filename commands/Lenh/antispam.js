const GuildSettings = require('../../Schema/guildSettings')

module.exports = {
    name: 'antispam',
    description: "Anti Spam",

    run : async(bot, message, args) => {
        if(args[0] === 'on'){
            await GuildSettings.findOneAndUpdate(
                { guildId: message.guild.id },
                { $set: { antispam: true } },
                { upsert: true, returnDocument: 'after' }
            )
            message.channel.send('Đã bật chức năng chống spam')
        } else if(args[0] === 'off') {
            await GuildSettings.findOneAndUpdate(
                { guildId: message.guild.id },
                { $set: { antispam: false } },
                { upsert: true, returnDocument: 'after' }
            )
            message.channel.send('Đã tắt chức năng chống spam')
        } else {
            message.channel.send('Dùng `>antispam on` hoặc `>antispam off`')
        }
    }
}
