module.exports = {
  name: "unmute",

  run: async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Bạn không có quyền sử dụng lệnh!");
    }

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!member) {
      return message.channel.send(
        "Không tìm thấy người dùng. Ví dụ: `>unmute @user`",
      );
    }

    const role = message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === "muted",
    );

    if (!role) {
      return message.channel.send("Server chưa có role `muted`.");
    }

    if (!member.roles.cache.has(role.id)) {
      return message.channel.send("Người này hiện không bị mute.");
    }

    const me = message.guild.members.me;

    if (!me.permissions.has("ManageRoles")) {
      return message.reply("Bot thiếu quyền **Manage Roles**!");
    }

    if (role.position >= me.roles.highest.position) {
      return message.reply(
        "Role `muted` đang cao hơn hoặc ngang role của bot, bot không thể gỡ role này!",
      );
    }

    try {
      await member.roles.remove(role);
      return message.channel.send(`${member.displayName} đã được unmuted`);
    } catch (error) {
      console.error(error);
      return message.reply(
        `Không unmute được người này: ${error.message || error}`,
      );
    }
  },
};
