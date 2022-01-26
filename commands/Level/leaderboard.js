const Discord = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    name: "leaderboard",
    aliases: ['lb'],
    cooldown: 1000 * 5,
    description: "..",

    async run(bot, message, args) {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

        if (rawLeaderboard.length < 1) return message.reply("Chưa có ai trên bảng xếp hạng");

        const leaderboard = await Levels.computeLeaderboard(bot, rawLeaderboard, true); // We process the leaderboard.

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.

        const embed =  new Discord.MessageEmbed()
        .setColor("WHITE")
        .setTitle("Bảng Xếp Hạng")
        .setDescription(lb.join("\n\n"))

        message.channel.send(embed);
    }
}