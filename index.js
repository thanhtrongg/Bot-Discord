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

const { readdirSync, read } = require('fs');

const commandFolders = readdirSync('./commands');

const Timeout = new Discord.Collection();

const generateImage = require("./commands/lenh/generateImage")

const hisinhImage = require("./commands/lenh/hisinhImage")

const { token } = require('./config.json');


require("dotenv").config()

const prefix = '>';

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thanhtrong:trong21082006@cluster0.onuou.mongodb.net/Data', {
}).then(console.log('Connected to mongo!'))

//levels
const Levels = require('discord-xp');

Levels.setURL("mongodb+srv://thanhtrong:trong21082006@cluster0.onuou.mongodb.net/Data")

//Welcome
const welcomeChannelId = "932450574392258640"

//Command Handler------------------------------------------------------------------------------
for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        bot.commands.set(command.name, command);
    }
}


bot.on("error", console.error);
//-----------------------------------------------------------------------------------

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

//----------------------------------------------------------
bot.on('ready', () => {
    console.log('Bot đã sẵn sàng!');
    bot.user.setActivity('Tao là một con bot đa năng');
})
//----------------------------------------------------------

const lvlschema = require('./Schema/lvltoggle');
bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    lvlschema.findOne({ guildId: message.guild.id}, async (e, data) => {
        if(!data) {
            new lvlschema({
                guildId: message.guild.id,
                toggle: 1,
            }).save();
            return;
        };

        if(data.toggle == 1) {
            //Levels
            const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
            const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
            if (hasLeveledUp) {
                const user = await Levels.fetch(message.author.id, message.guild.id);
                message.channel.send(`${message.author}, Chúc mừng! Bạn đã lên level **${user.level}**! Bạn nhận được Role: Level ${user.level}!`);

                if (user.level == 1) {
                    let role = message.guild.roles.cache.find(role => role.name == "Level 1");
                    if (!role) await message.guild.roles.create({
                        data: {
                            name: "Level 1",
                            color: "#00f8ff",
                        }
                    }).catch(err => console.log(err));
                    role = message.guild.roles.cache.find(role => role.name == "Level 1");
                    if (message.member.roles.cache.has(role.id)) return;
                    else await message.member.roles.add(role.id);
                }

                if (user.level == 2) {
                    let role = message.guild.roles.cache.find(role => role.name == "Level 2");
                    if (!role) await message.guild.roles.create({
                        data: {
                            name: "Level 2",
                            color: "#00ff89",
                        }
                    }).catch(err => console.log(err));
                    role = message.guild.roles.cache.find(role => role.name == "Level 2");
                    if (message.member.roles.cache.has(role.id)) return;
                    else await message.member.roles.add(role.id);
                }

                if (user.level == 3) {
                    let role = message.guild.roles.cache.find(role => role.name == "Level 3");
                    if (!role) await message.guild.roles.create({
                        data: {
                            name: "Level 3",
                            color: "#a2ff00",
                        }
                    }).catch(err => console.log(err));
                    role = message.guild.roles.cache.find(role => role.name == "Level 3");
                    if (message.member.roles.cache.has(role.id)) return;
                    else await message.member.roles.add(role.id);
                }

                if (user.level == 4) {
                    let role = message.guild.roles.cache.find(role => role.name == "Level 4");
                    if (!role) await message.guild.roles.create({
                        data: {
                            name: "Level 4",
                            color: "#b000ff",
                        }
                    }).catch(err => console.log(err));
                    role = message.guild.roles.cache.find(role => role.name == "Level 4");
                    if (message.member.roles.cache.has(role.id)) return;
                    else await message.member.roles.add(role.id);
                }

                if (user.level == 5) {
                    let role = message.guild.roles.cache.find(role => role.name == "Master");
                    if (!role) await message.guild.roles.create({
                        data: {
                            name: "Master",
                            color: "#daff00",
                        }
                    }).catch(err => console.log(err));
                    role = message.guild.roles.cache.find(role => role.name == "Master");
                    if (message.member.roles.cache.has(role.id)) return;
                    else await message.member.roles.add(role.id);
                }

                if (user.level == 10) {
                    let role = message.guild.roles.cache.find(role => role.name == "Grandmaster");
                    if (!role) await message.guild.roles.create({
                        data: {
                            name: "Grandmaster",
                            color: "#ff7d00",
                        }
                    }).catch(err => console.log(err));
                    role = message.guild.roles.cache.find(role => role.name == "Grandmaster");
                    if (message.member.roles.cache.has(role.id)) return;
                    else await message.member.roles.add(role.id);
                }

                if (user.level == 15) {
                    let role = message.guild.roles.cache.find(role => role.name == "Anh Hùng Bàn Phím");
                    if (!role) await message.guild.roles.create({
                        data: {
                            name: "Anh Hùng Bàn Phím",
                            color: "#ff0000",
                        }
                    }).catch(err => console.log(err));
                    role = message.guild.roles.cache.find(role => role.name == "Anh Hùng Bàn Phím");
                    if (message.member.roles.cache.has(role.id)) return;
                    else await message.member.roles.add(role.id);
                }
            }
            //
        } else if(data.toggle == 0) {
            //
        }
    })

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        if (command) {
            if (command.cooldown) {
                if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`Please Wait \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` Before using this command again!`);
                command.run(bot, message, args)
                Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    Timeout.delete(`${command.name}${message.author.id}`)
                }, command.cooldown)
            } else command.run(bot, message, args);
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


bot.login(token);