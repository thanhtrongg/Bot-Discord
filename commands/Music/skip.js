module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "skips the current song in the queue",

  async run(bot, message) {
    if (!message.member?.voice?.channel) {
      return message.reply("Hãy vào kênh voice trước đã!");
    }

    const queue = bot.distube.getQueue(message.guildId);

    if (!queue) {
      return message.channel.send("Hiện tại không có bài nào đang phát!");
    }

    if (queue.songs.length <= 1) {
      return message.channel.send("Không có bài tiếp theo để skip!");
    }

    try {
      await bot.distube.skip(message.guildId);
      await message.channel.send("Đã bỏ qua bài hát!");
    } catch (error) {
      console.error(error);
      return message.channel.send(
        `Không skip được bài: ${error.message || error}`,
      );
    }
  },
};
