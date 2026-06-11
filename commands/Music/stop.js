module.exports = {
  name: "stop",
  aliases: ["leave", "dc"],
  description: "stops playing a song!",

  async run(bot, message) {
    if (!message.member?.voice?.channel) {
      return message.reply("Hãy vào kênh voice trước đã!");
    }

    const queue = bot.distube.getQueue(message.guildId);

    if (!queue) {
      return message.channel.send("Hiện tại không có bài nào đang phát!");
    }

    try {
      await bot.distube.stop(message.guildId);
      await message.channel.send("**Đã dừng nhạc và xoá hàng đợi!**");
    } catch (error) {
      console.error(error);
      return message.channel.send(
        `Không dừng được nhạc: ${error.message || error}`,
      );
    }
  },
};
