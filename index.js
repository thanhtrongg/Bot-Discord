const Discord = require('discord.js')

const bot = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

// we make a new system for the cmds
bot.commands = new Discord.Collection();

const generateImage = require("./commands/generateImage")

const hisinhImage = require("./commands/hisinhImage")

const { token } = require('./config.json');

const { readdirSync, read } = require('fs');

const { join } = require('path');

require("dotenv").config()

const prefix = '>';

const Canvacord = require('canvacord');

const db = require('quick.db')

//Anime API
const API = require('anime-images-api');

const image_api = new API();

//Welcome
const welcomeChannelId = "932450574392258640"

bot.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Chào mừng bạn đã đến đây 👋 vui lòng đọc quy định của nhóm tại đây 👉 <#932205722958176266>`,
        files: [img]
    })
})
//---------------------------------

//Goodbye
const goodbyeChannelId = "932455907000983563"

bot.on("guildMemberRemove", async (member) => {
    const img = await hisinhImage(member)
    member.guild.channels.cache.get(goodbyeChannelId).send({
        content: `<@${member.id}> đã hi sinh. Chúng ta hãy khuất mặt niệm cho người chiến sĩ đã hi sinh này nào!`,
        files: [img]
    })
})
//---------------------------------

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const  command = require(join(__dirname, "commands", `${file}`));
    bot.commands.set(command.name, command);
}

bot.on("error", console.error);

//----------------------------------------------------------
bot.on('ready', () => {
    console.log('Bot đã sẵn sàng!');
    bot.user.setActivity('Tao là một con bot đa năng');
})
//----------------------------------------------------------

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!bot.commands.has(command)) return;

        try {
            bot.commands.get(command).run(bot, message, args);
        } catch (error){
            console.error(error);
        }
    }
})

//Music------------------------------------------------------------------
bot.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'clear') {
        bot.commands.get('clear').execute(message, args);
    } else if(command === 'play') {
        bot.commands.get('play').execute(message, args);
    } else if(command === 'leave') {
        bot.commands.get('leave').execute(message, args);
    }
})
//----------------------------------------------------------------------

//Anime 
bot.on('message', message => {
    if(message.content.startsWith(`${prefix}animee`)) {
        image_api.sfw.pat().then(response => {
            message.channel.send(response.image)
        })
    }
})

//Anti Spam
const usersMap = new Map();
const LIMIT = 5;
const TIME = 120000;
const DIFF = 10000;

bot.on('message', async(message) => {
    if(message.author.bot) return;
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);

        if(difference > DIFF) {
            clearTimeout(timer);
            console.log('Cleared Timeout');
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed from map.')
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                let muterole = message.guild.roles.cache.find(role => role.name === 'muted');
                if(!muterole) {
                    try{
                        muterole = await message.guild.roles.create({
                            name : "muted",
                            permissions: []
                        })
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS : false
                            })
                        })
                    }catch (e) {
                        console.log(e)
                    }
                }
                message.member.roles.add(muterole);
                message.channel.send('Bạn đã spam link sẽ gầy quá nhiều, bạn đã bị mute!');
                setTimeout(() => {
                    message.member.roles.remove(muterole);
                    message.channel.send('Bạn đã được unmute!')
                }, TIME);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed from map.')
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
})
//-----------------------------------------------------------------


//Xp-Rank
bot.on("message", async (message, guild) => {
    xp(message)
    if(message.content.startsWith(`${prefix}rank`)) {
    if(message.author.bot) return;
    var user = message.mentions.users.first() || message.author;
    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    var xpNeeded = level * 500 + 500 // 500 + 1000 + 1500
    const rankcard = new Canvacord.Rank()
        .setAvatar(user.displayAvatarURL({format: 'png', dynamic: true}))
        .setCurrentXP(db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0)
        .setRequiredXP(xpNeeded)
        .setStatus(user.presence.status)
        .setLevel(db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0)
        .setRank(1, 'RANK', false)
        .setProgressBar("#a81d16", "COLOR")
        .setOverlay("#000000")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBackground("COLOR", "#808080")
        rankcard.build()
        .then(data => {
            const atta = new Discord.MessageAttachment(data, "rank.png")
            message.channel.send(atta)
        })
    }

    function xp(message) {
        if(message.author.bot) return
        const randomNumber = Math.floor(Math.random() * 10) + 15;
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber) 
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 500;
        if(xpNeeded < xp){
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1) 
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            message.channel.send(`Chúc mừng ${message.author}, bạn đã lên level, level hiện tại của bạn là level ${newLevel}`)
        }
    }
})
//-----------------------------------------------------------------


bot.login(token);