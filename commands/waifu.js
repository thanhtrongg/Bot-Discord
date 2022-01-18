const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = {
    name: "www",
    description: "meme command, sends a meme from certain place",

    async run (bot, message, args) {
        const subReddits = ["waifualert"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random)

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`**Waifu**`)
        .setURL(`https://twitter.com/${random}`)

        message.channel.send(embed)
    }
}