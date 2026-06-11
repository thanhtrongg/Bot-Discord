const Discord = require('discord.js')

module.exports = {
    name: "keobuabao",
    description: "rock paper scissors command",

    async run (bot, message, args) {
        const choices = ['🔨', '✂️', '📄']
        const labels = {
            '🔨': 'Búa',
            '✂️': 'Kéo',
            '📄': 'Bao',
        }

        let embed = new Discord.MessageEmbed()
        .setTitle("Kéo Búa Bao")
        .setDescription("Chọn một biểu cảm bên dưới.")
        .setTimestamp()

        let msg = await message.channel.send(embed)
        for (const choice of choices) {
            await msg.react(choice)
        }

        const filter = (reaction, user) => {
            return choices.includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const me = choices[Math.floor(Math.random() * choices.length)]

        try {
            const collected = await msg.awaitReactions({
                filter,
                max: 1,
                time: 60000,
                errors: ["time"],
            })

            const reaction = collected.first()
            const player = reaction.emoji.name
            const outcome = getOutcome(player, me)

            let result = new Discord.MessageEmbed()
            .setTitle("Kết quả")
            .addField("Bạn chọn", `${player} ${labels[player]}`)
            .addField("Bot chọn", `${me} ${labels[me]}`)
            .setColor(outcome.color)

            await msg.edit(result)
            return message.reply(outcome.text)
        } catch (error) {
            return message.reply('Hết giờ suy nghĩ!');
        }

    }
}

function getOutcome(player, bot) {
    if (player === bot) {
        return {
            text: 'Hòa!',
            color: 'YELLOW',
        }
    }

    const playerWins = (
        (player === '🔨' && bot === '✂️') ||
        (player === '✂️' && bot === '📄') ||
        (player === '📄' && bot === '🔨')
    )

    if (playerWins) {
        return {
            text: 'Bạn thắng!',
            color: 'GREEN',
        }
    }

    return {
        text: 'Bạn thua!',
        color: 'RED',
    }
}
