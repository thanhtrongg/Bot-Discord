const Discord = require('discord.js');

module.exports = {
    name: "queue",
    aliases: ['q'],
    description: "check queue",

    async run (bot, message, args) {
        if(!message.member.voice.channel) return message.reply('Hãy vào kênh nói chuyện!'); //optional

        const queue = bot.distube.getQueue(message.guild);
        if (!queue) return message.channel.send('Hàng đợi đang trống!');

        await message.channel.send(`Hàng đợi hiện tại:\n${queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formatDuration()}\``).slice(0, 10).join('\n')}`);
    }
}
