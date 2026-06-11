const Discord = require('discord.js');

module.exports = {
    name: "girl",
    description: "meme command, sends a meme from certain place",

    async run (bot, message, args) {
        if (!isNsfwChannel(message.channel)) {
            return message.channel.send("Lệnh này chỉ dùng được trong kênh được đánh dấu NSFW.")
        }

        let post;
        try {
            const response = await fetch('https://api.waifu.pics/sfw/waifu')
            if (!response.ok) throw new Error(`Anime image API failed with status ${response.status}`)

            const data = await response.json()
            if (!data.url) throw new Error('Anime image API did not return an image URL')

            post = {
                image: data.url,
                title: 'Anime Girl',
                url: data.url,
            }
        } catch (error) {
            console.warn(error.message)
            return message.channel.send("Không lấy được ảnh lúc này, thử lại sau nha.")
        }

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(post.image)
        .setTitle(post.title)
        .setURL(post.url)

        message.channel.send(embed)
        
    }
}

function isNsfwChannel(channel) {
    return Boolean(channel?.nsfw || channel?.parent?.nsfw)
}
