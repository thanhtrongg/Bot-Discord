const Discord = require('discord.js')

module.exports = {
    name: "keobuabao",
    description: "rock paper scissors command",

    async run (bot, message, args) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Kéo Búa Bao")
        .setDescription("Bắt đầu!")
        .setTimestamp()
        let msg = await message.channel.send(embed)
        await msg.react("🔨")
        await msg.react("✂")
        await msg.react("📰")

        const filter = (reaction, user) => {
            return ['🔨', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🔨', '✂', '📰']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max: 1, time: 60000, error: ["time"]}).then(
            async(collected) => {
                const reaction = collected.first()
                let result = new Discord.MessageEmbed()
                .setTitle("Kết quả")
                .addField("Bạn chọn", `${reaction.emoji.name}`)
                .addField("Bot chọn", `${me}`)
                await msg.edit(result)

                if((me === "🔨" && reaction.emoji.name === "✂") ||
                (me === "✂" && reaction.emoji.name === "📰") ||
                (me === "📰" && reaction.emoji.name === "🔨")) {
                    message.reply("Bạn thua!");
                } else if (me === reaction.emoji.name) {
                    return message.reply("Hòa!");
                } else {
                    return message.reply("Bạn thắng!");
                }
            })
            .catch(collected => {
                message.reply('Hết giờ suy nghĩ!');
            }) 

    }
}