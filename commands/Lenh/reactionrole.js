const { MessageEmbed, Role } = require('discord.js')

module.exports = {
    name: 'role',
    description: "Sets up a reaction role message!",

    async run (bot, message, args) {
        const channelID = message.mentions.channels.first();
        if(!channelID) return message.reply("Chọn channel\n `Ví dụ: >role #<channel> <mô tả>`")

        const desc = args.slice(1).join(" ")
        if(!desc) return message.reply("Cho mô tả\n `Ví dụ: >role #<channel> <mô tả>`")


        const Role1 = message.guild.roles.cache.find(role => role.name === "DARK MEMBER")
        const Role2 = message.guild.roles.cache.find(role => role.name === "NSFW MEMBER")
        if(!Role1 || !Role2) return message.reply("Không tìm thấy role `DARK MEMBER` hoặc `NSFW MEMBER`")

        const emoji1 = '👿';
        const emoji2 = '🔞';


        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("ROLE")
        .setDescription(desc)

        let msgembed = await channelID.send(embed)
        await msgembed.react(emoji1)
        await msgembed.react(emoji2)

        bot.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channelID.id) {
                if (reaction.emoji.name === emoji1) {
                    const member = await reaction.message.guild.members.fetch(user.id)
                    await member.roles.add(Role1)
                }
                if (reaction.emoji.name === emoji2) {
                    const member = await reaction.message.guild.members.fetch(user.id)
                    await member.roles.add(Role2)
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

            if (reaction.message.channel.id == channelID.id) {
                if (reaction.emoji.name === emoji1) {
                    const member = await reaction.message.guild.members.fetch(user.id)
                    await member.roles.remove(Role1)
                }
                if (reaction.emoji.name === emoji2) {
                    const member = await reaction.message.guild.members.fetch(user.id)
                    await member.roles.remove(Role2)
                }
            } else {
                return;
            }
        });
    }
}
