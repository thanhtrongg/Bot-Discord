const discord = require('discord.js')
const schema = require('./user-schema')

module.exports = {
    name: 'blacklist',

    run : async(bot, message, args) => {
        if(message.author.id !== '747294784544178236') return

        let user = message.mentions.users.first()
        if(!user) return message.channel.send("Tag thành viên!")

        let data;
        try {
            data = await schema.findOne({
                userId: user.id
            })
            if(!data) {
                data = await schema.create({
                    userId: user.id
                })
            }
        } catch (error) {
            console.log(error)
        }

        data.blacklisted = true
        await data.save()
        return message.channel.send(`Blacklisted thành công thành viên ${user.tag}`)
    }
}