const Discord = require('discord.js');
const { getRandomRedditImage } = require('../../utils/reddit');

module.exports = {
    name: "meme",
    description: "meme command, sends a meme from certain place",

    async run (bot, message, args) {
        const subReddits = ["VietNam", "meme", "memes", "dankmeme"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        let post;
        try {
            post = await getRandomRedditImage(random)
        } catch (error) {
            console.warn(error.message)
            return message.channel.send("Không lấy được meme lúc này, thử lại sau nha.")
        }

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(post.image)
        .setTitle(post.title)
        .setURL(post.url)

        message.channel.send(embed)
    }
}
