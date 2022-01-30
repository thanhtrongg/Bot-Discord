const discord = require('discord.js');
const ms = require('ms')
const canvacord = require('canvacord').Canvas

module.exports = {
    name: "slap",
    aliases: ['sl'],

    run : async (bot, message, args) => {    
        var rainbowMember = message.mentions.users.first() || message.author;
        if(!rainbowMember) return;
    
        var image = await canvacord.slap(message.author.displayAvatarURL({format: "png", size: 2048, dynamic: true}), rainbowMember.displayAvatarURL({format: "png", size: 2048, dynamic: true}))
        var attachment = new discord.MessageAttachment(image, "batslap.png")
        message.channel.send(attachment)
        
    }
} 