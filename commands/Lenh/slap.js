const discord = require('discord.js');
const Canvas = require('canvas')

module.exports = {
    name: "slap",
    aliases: ['sl'],

    run : async (bot, message, args) => {    
        var rainbowMember = message.mentions.users.first() || message.author;
        if(!rainbowMember) return;
    
        const canvas = Canvas.createCanvas(700, 300)
        const ctx = canvas.getContext('2d')

        ctx.fillStyle = '#f5f5f5'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#111827'
        ctx.font = 'bold 42px Arial'
        ctx.fillText('SLAP!', 292, 70)

        const authorAvatar = await Canvas.loadImage(message.author.displayAvatarURL({ extension: "png", size: 256 }))
        const targetAvatar = await Canvas.loadImage(rainbowMember.displayAvatarURL({ extension: "png", size: 256 }))

        ctx.drawImage(authorAvatar, 80, 80, 180, 180)
        ctx.drawImage(targetAvatar, 440, 80, 180, 180)

        ctx.strokeStyle = '#ef4444'
        ctx.lineWidth = 18
        ctx.beginPath()
        ctx.moveTo(275, 160)
        ctx.lineTo(425, 160)
        ctx.stroke()

        ctx.fillStyle = '#ef4444'
        ctx.beginPath()
        ctx.moveTo(425, 160)
        ctx.lineTo(390, 130)
        ctx.lineTo(390, 190)
        ctx.fill()

        var attachment = new discord.MessageAttachment(canvas.toBuffer('image/png'), "batslap.png")
        message.channel.send(attachment)
        
    }
}
