const Discord = require('discord.js');
const schema = require('../../Schema/lvltoggle');

module.exports = {
    name: "leveltoggle",
    description: "..",

    run : async (bot, message, args) => {
        let data = await schema.findOne({ guildId: message.guild.id});
        if(!data) {
            await schema.create({
                guildId: message.guild.id,
                toggle: 1,
            });
            return message.channel.send('Level Toggle: *on*');
        }

        if(data.toggle == 1) {
            data.toggle -= 1;
            await data.save();
            return message.channel.send('Level Toggle: *off*');
        } else if(data.toggle == 0) {
            data.toggle += 1;
            await data.save();
            return message.channel.send('Level Toggle: *on*');
        }
    }
}
