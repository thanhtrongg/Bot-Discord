module.exports = {
  name: "play",
  aliases: ["p"],
  description: "play a song!",

  async run(bot, message, args) {
    const voiceChannel = message.member?.voice?.channel;

    if (!voiceChannel) {
      return message.reply("Hãy vào kênh voice trước đã!");
    }

    const music = args.join(" ").trim();

    if (!music) {
      return message.reply(
        "Ghi tên bài hát hoặc link bài hát! Ví dụ: `>play faded alan walker`",
      );
    }

    const me = message.guild.members.me;
    const permissions = voiceChannel.permissionsFor(me);

    if (!permissions?.has("Connect") || !permissions?.has("Speak")) {
      return message.reply(
        "Bot thiếu quyền **Connect** hoặc **Speak** trong kênh voice này!",
      );
    }

    const queue = bot.distube.getQueue(message.guildId);

    if (queue?.voiceChannel && queue.voiceChannel.id !== voiceChannel.id) {
      return message.reply(
        `Bot đang phát nhạc ở kênh **${queue.voiceChannel.name}** rồi!`,
      );
    }

    try {
      await bot.distube.play(voiceChannel, music, {
        member: message.member,
        message,
        textChannel: message.channel,
      });
    } catch (error) {
      console.error(error);
      return message.channel.send(
        `Không phát được bài này: ${error.message || error}`,
      );
    }
  },
};
