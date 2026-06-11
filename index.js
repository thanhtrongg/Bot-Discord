const Discord = require('discord.js')
require('./utils/discord-v12-compat')(Discord)

const {
    ActivityType,
    ChannelType,
    Collection,
    GatewayIntentBits,
    Partials,
} = Discord

const bot = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
    ],
})

// we make a new system for the cmds
bot.commands = new Collection();

const { readdirSync } = require('fs');

const commandFolders = readdirSync('./commands');

const Timeout = new Collection();

const generateImage = require("./commands/Lenh/generateImage")

const hisinhImage = require("./commands/Lenh/hisinhImage")

require("dotenv").config()

const requiredEnv = ["DISCORD_TOKEN", "MONGODB_URI"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
    console.error(`Missing required environment variables: ${missingEnv.join(", ")}`);
    process.exit(1);
}

const { DISCORD_TOKEN, MONGODB_URI } = process.env;

const ms = require('ms');

const prefix = '>';

const mongoose = require('mongoose');

//levels
const Levels = require('./utils/levels');

const GuildSettings = require('./Schema/guildSettings');

//Welcome
const welcomeChannelId = "966003221799792722"

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

//Welcome
bot.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    const channel = member.guild.channels.cache.get(welcomeChannelId)
    if (!channel) return
    channel.send({
        content: `<@${member.id}> Chào mừng bạn đã đến đây 👋 vui lòng đọc quy định của nhóm tại đây 👉 <#966234935880974346>`,
        files: [img]
    })
})
//---------------------------------

//Goodbye
const goodbyeChannelId = "966231780275413032"

bot.on("guildMemberRemove", async (member) => {
    const img = await hisinhImage(member)
    const channel = member.guild.channels.cache.get(goodbyeChannelId)
    if (!channel) return
    channel.send({
        content: `<@${member.id}> đã hi sinh. Chúng ta hãy khuất mặt niệm cho người chiến sĩ đã hi sinh này nào!`,
        files: [img]
    })
})
//---------------------------------

//----------------------------------------------------------
bot.on('clientReady', () => {
    console.log('Bot đã sẵn sàng!');
    bot.user.setActivity('Tao là một con bot đa năng', { type: ActivityType.Playing });
})
//----------------------------------------------------------

const lvlschema = require('./Schema/lvltoggle');
bot.on("messageCreate", async message => {

    if(message.author.bot) return;
    if(message.channel.type === ChannelType.DM) return;

    let data = await lvlschema.findOne({ guildId: message.guild.id});
    if(!data) {
        data = await lvlschema.create({
                guildId: message.guild.id,
                toggle: 1,
        });
    };

    if(data.toggle == 1) {
        //Levels
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            bot.channels.cache.get('966237517059862610')?.send(`${message.author}, Chúc mừng! Bạn đã lên level **${user.level}**!`);

            if (user.level == 1) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 1");
                if (!role) await message.guild.roles.create({
                    name: "Level 1",
                    color: "#00f8ff",
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 1");
                if (message.member.roles.cache.has(role.id)) return;
                else await addRoleSafely(message.member, role);
            }

            if (user.level == 2) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 2");
                if (!role) await message.guild.roles.create({
                    name: "Level 2",
                    color: "#00ff89",
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 2");
                if (message.member.roles.cache.has(role.id)) return;
                else await addRoleSafely(message.member, role);
            }

            if (user.level == 3) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 3");
                if (!role) await message.guild.roles.create({
                    name: "Level 3",
                    color: "#a2ff00",
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 3");
                if (message.member.roles.cache.has(role.id)) return;
                else await addRoleSafely(message.member, role);
            }

            if (user.level == 4) {
                let role = message.guild.roles.cache.find(role => role.name == "Level 4");
                if (!role) await message.guild.roles.create({
                    name: "Level 4",
                    color: "#b000ff",
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Level 4");
                if (message.member.roles.cache.has(role.id)) return;
                else await addRoleSafely(message.member, role);
            }

            if (user.level == 5) {
                let role = message.guild.roles.cache.find(role => role.name == "Master");
                if (!role) await message.guild.roles.create({
                    name: "Master",
                    color: "#daff00",
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Master");
                if (message.member.roles.cache.has(role.id)) return;
                else await addRoleSafely(message.member, role);
            }

            if (user.level == 10) {
                let role = message.guild.roles.cache.find(role => role.name == "Grandmaster");
                if (!role) await message.guild.roles.create({
                    name: "Grandmaster",
                    color: "#ff7d00",
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Grandmaster");
                if (message.member.roles.cache.has(role.id)) return;
                else await addRoleSafely(message.member, role);
            }

            if (user.level == 15) {
                let role = message.guild.roles.cache.find(role => role.name == "Anh Hùng Bàn Phím");
                if (!role) await message.guild.roles.create({
                    name: "Anh Hùng Bàn Phím",
                    color: "#ff0000",
                }).catch(err => console.log(err));
                role = message.guild.roles.cache.find(role => role.name == "Anh Hùng Bàn Phím");
                if (message.member.roles.cache.has(role.id)) return;
                else await addRoleSafely(message.member, role);
            }
        }
    } else if(data.toggle == 0) {
        //
    }

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        if (command) {
            if (command.cooldown) {
                if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`Please Wait \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` Before using this command again!`);
                await runCommand(command, bot, message, args)
                Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    Timeout.delete(`${command.name}${message.author.id}`)
                }, command.cooldown)
            } else await runCommand(command, bot, message, args);
        }
    }
})

//Anti Spam
const usersMap = new Map();
const LIMIT = 5;
const TIME = 20000;
const DIFF = 10000;

bot.on('messageCreate', async(message) => {
    if(message.author.bot) return;
    if (!message.guild) return;

    const settings = await GuildSettings.findOne({ guildId: message.guild.id }).lean();
    if(!settings?.antispam) return;
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
                            if (!channel.permissionOverwrites) return;
                            await channel.permissionOverwrites.edit(muterole, {
                                SendMessages: false,
                                AddReactions : false
                            })
                        })
                    }catch (e) {
                        console.log(e)
                    }
                }
                await addRoleSafely(message.member, muterole);
                bot.channels.cache.get('966237517059862610').send(`${message.author}, sống chậm lại nào!`);
                setTimeout(() => {
                    message.member.roles.remove(muterole).catch((error) => {
                        console.warn(`Cannot remove role ${muterole.name} from ${message.author.tag}: ${error.message}`);
                    });
                    bot.channels.cache.get('966237517059862610').send(`${message.author} đã được unmute!`)
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
//--------------------------------------------------------------------------------------------------------------------\\
const { DisTube } = require('distube');
const { YouTubePlugin } = require('@distube/youtube');
bot.distube = new DisTube(bot, {
    emitNewSongOnly: true,
    plugins: [new YouTubePlugin()],
})
bot.distube
    .on('playSong', (queue, song) => queue.textChannel?.send(
        `Nghe bài \`${song.name}\` - \`${song.formatDuration()}\`\nThành viên yêu cầu: ${song.user}`,
    ))
    .on('addSong', (queue, song) => queue.textChannel?.send(
        `Thêm bài ${song.name} - \`${song.formatDuration()}\` vào hàng đợi bởi ${song.user}`,
    ))
    .on('error', (error, queue) => {
		//console.error(e)
        const channel = queue?.textChannel;
        if (channel) channel.send(`Đã xảy ra lỗi: ${error.message || error}`)
	})


function runCommand(command, bot, message, args) {
    const handler = command.run || command.execute;
    if (!handler) return;
    return handler(bot, message, args);
}

async function addRoleSafely(member, role) {
    if (!member || !role) return false;
    if (member.roles.cache.has(role.id)) return true;

    try {
        await member.roles.add(role);
        return true;
    } catch (error) {
        console.warn(`Cannot add role ${role.name} to ${member.user.tag}: ${error.message}`);
        return false;
    }
}

async function start() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to mongo!');
        await bot.login(DISCORD_TOKEN);
    } catch (error) {
        console.error('Failed to start bot:', error);
        process.exit(1);
    }
}

start();
