const Discord = require('discord.js');
const Levels = require('../../utils/levels');
const Canvas = require('canvas');

module.exports = {
    name: "level",
    aliases: ['lv'],
    description: "..",

    run : async (bot, message, args) => {
        const target = message.mentions.users.first() || message.author; // Grab the target.

        const user = await Levels.fetch(target.id, message.guild.id); // Selects the target from the database.

        if (!user) return message.channel.send("Có vẻ như thằng loz này chưa kiếm được xp nào."); // If there isnt such user in the database, we send a message in general.

        const neededXp = Levels.xpFor(parseInt(user.level) + 1)

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
        const progress = Math.max(0, Math.min(user.xp / neededXp, 1));

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#20232a');
        gradient.addColorStop(1, '#5865f2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(32, 32, canvas.width - 64, canvas.height - 64);

        const avatar = await Canvas.loadImage(target.displayAvatarURL({ extension: 'png', size: 256 }));
        ctx.save();
        ctx.beginPath();
        ctx.arc(125, 125, 78, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 47, 47, 156, 156);
        ctx.restore();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 34px Arial';
        ctx.fillText(target.username, 235, 88);

        ctx.font = '24px Arial';
        ctx.fillText(`Level ${user.level}`, 235, 130);
        ctx.fillText(`${user.xp.toLocaleString()} / ${neededXp.toLocaleString()} XP`, 235, 162);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fillRect(235, 182, 390, 24);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(235, 182, 390 * progress, 24);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), "RankCard.png");
        message.channel.send(attachment);
    }
}
