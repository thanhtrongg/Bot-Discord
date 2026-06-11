module.exports = {
  name: "queue",
  aliases: ["q"],
  description: "check queue",

  async run(bot, message) {
    const queue = bot.distube.getQueue(message.guildId);

    if (!queue) {
      return message.channel.send("Hàng đợi đang trống!");
    }

    const list = queue.songs
      .map((song, index) => {
        const duration =
          song.formattedDuration || song.formatDuration?.() || "unknown";
        return `**${index + 1}.** ${song.name} - \`${duration}\``;
      })
      .slice(0, 10)
      .join("\n");

    return message.channel.send(`Hàng đợi hiện tại:\n${list}`);
  },
};
