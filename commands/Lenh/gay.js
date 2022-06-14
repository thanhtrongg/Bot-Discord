const Discord = require('discord.js')

module.exports = {
    name: "gay",
    description: "gay lỏd",

    async run (bot, message, args) {
        let member = message.mentions.users.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setTitle(`% Gay`)
        .setDescription(`${member.username} bị ` + rng + "% Gay🌈")
        .setColor("GREEN")

        message.channel.send(howgayembed);
    }
}
