const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",

  run: async (bot, msg, args) => {
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
      return msg.reply("Bạn không có quyền sử dụng lệnh!");
    }

    const user = msg.mentions.users.first();

    if (!user) {
      return msg.reply(
        "Bạn chưa tag thành viên! Ví dụ: `>mute @user 10m spam`",
      );
    }

    let member;

    try {
      member = await msg.guild.members.fetch(user.id);
    } catch {
      member = null;
    }

    if (!member) {
      return msg.reply("Không tìm thấy thành viên!");
    }

    if (member.hasPermission("MANAGE_MESSAGES")) {
      return msg.reply("Bạn không thể mute người này!");
    }

    const rawTime = args[1];

    if (!rawTime) {
      return msg.reply(
        "Bạn chưa nhập thời gian mute! Ví dụ: `10m`, `1h`, `1d`.",
      );
    }

    const time = ms(rawTime);

    if (!time || time < 1000) {
      return msg.reply(
        "Thời gian mute không hợp lệ! Ví dụ đúng: `10m`, `1h`, `1d`.",
      );
    }

    const reason = args.slice(2).join(" ").trim();

    if (!reason) {
      return msg.reply("Bạn cần phải nhập lý do!");
    }

    let role = msg.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === "muted",
    );

    if (!role) {
      role = await msg.guild.roles.create({
        name: "muted",
        permissions: [],
        reason: "Create muted role for mute command",
      });
    }

    const me = msg.guild.members.me;

    if (!me.permissions.has("ManageRoles")) {
      return msg.reply("Bot thiếu quyền **Manage Roles**!");
    }

    if (role.position >= me.roles.highest.position) {
      return msg.reply(
        "Role `muted` đang cao hơn hoặc ngang role của bot, bot không thể gán role này!",
      );
    }

    try {
      await member.roles.add(role);

      const log = new Discord.MessageEmbed()
        .setTitle("Thành viên bị Muted")
        .addField("Thành viên:", user, true)
        .addField("Bởi:", msg.author, true)
        .addField("Thời gian bị muted:", rawTime)
        .addField("Lý do:", reason);

      await msg.channel.send(log);

      const embed = new Discord.MessageEmbed()
        .setTitle("Bạn đã bị muted!")
        .addField("Thời gian bị muted:", rawTime, true)
        .addField("Lý do:", reason, true);

      await user.send(embed).catch(() => null);

      setTimeout(async () => {
        await member.roles.remove(role).catch((error) => {
          console.warn(
            `Cannot remove muted role from ${member.user.tag}: ${error.message}`,
          );
        });
      }, time);
    } catch (error) {
      console.error(error);
      return msg.reply(`Không mute được người này: ${error.message || error}`);
    }
  },
};
