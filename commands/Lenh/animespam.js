const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = {
    name: "girl",
    description: "meme command, sends a meme from certain place",

    async run (bot, message, args) {
        const subReddits = ["406650676539589"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random)

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`**Girl Sexy**`)
        .setURL(`https://www.facebook.com/${random}`)

        message.channel.send(embed)
        
    }
}