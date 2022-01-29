const { MessageEmbed, Role } = require('discord.js')

module.exports = {
    name: 'role',
    description: "Sets up a reaction role message!",

    async run (bot, message, args) {
        const channelID = message.mentions.channels.first();
        if(!channelID) return message.reply("Vui lòng chỉ định kênh hợp lệ mà bạn muốn gửi nội dung nhúng vào!\n `VD: .role #<channel> <Mô tả>`")

        const desc = args.slice(1).join(" ")
        if(!desc) return message.reply("Vui lòng thêm mô tả!\n `VD: .role #<channel> <Mô tả>`")


        const Role1 = message.guild.roles.cache.find(role => role.name === "Minh Quyền Năng")
        const Role2 = message.guild.roles.cache.find(role => role.name === "boss")

        const emoji1 = '👍';
        const emoji2 = '👎';


        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Lấy Role Quyền Cao")
        .setDescription(desc)

        let msgembed = await channelID.send(embed)
        await msgembed.react(emoji1)
        await msgembed.react(emoji2)

        bot.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channelID) {
                if (reaction.emoji.name === emoji1) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Role1)
                }
                if (reaction.emoji.name === emoji2) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Role2)
                }
            } else {
                return;
            }
        });

        bot.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channelID) {
                if (reaction.emoji.name === emoji1) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Role1)
                }
                if (reaction.emoji.name === emoji2) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Role2)
                }
            } else {
                return;
            }
        });
    }
}