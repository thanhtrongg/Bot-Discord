module.exports = {
  name: "loop",
  aliases: ["l", "repeat", "r"],
  description: "loops current song or queue",

  async run(bot, message, args) {
    if (!message.member?.voice?.channel) {
      return message.reply("Hãy vào kênh voice trước đã!");
    }

    const queue = bot.distube.getQueue(message.guildId);

    if (!queue) {
      return message.channel.send("Hiện tại không có bài nào đang phát!");
    }

    const mode = Number(args[0] ?? 1);

    if (![0, 1, 2].includes(mode)) {
      return message.reply(
        "Chọn mode hợp lệ: `0` tắt, `1` lặp bài, `2` lặp hàng đợi.",
      );
    }

    try {
      const result = bot.distube.setRepeatMode(message.guildId, mode);

      const text =
        result === 0
          ? "Đã tắt loop!"
          : result === 1
            ? "Đã loop bài hiện tại!"
            : "Đã loop hàng đợi!";

      return message.channel.send(text);
    } catch (error) {
      console.error(error);
      return message.channel.send(
        `Không set loop được: ${error.message || error}`,
      );
    }
  },
};
