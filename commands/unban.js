const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'unban',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You are missing **BAN_MEMBERS** permission!').then((m) => m.delete({ timeout: 5000 }));

		if (!args[0]) return message.channel.send('Nhập id người dùng muốn unban!').then((m) => m.delete({ timeout: 5000 }));

		let member;

		try {
			member = await client.users.fetch(args[0]);
		} catch (e) {
			console.log(e);
			return message.channel.send('Người dùng không tồn tại!').then((m) => m.delete({ timeout: 5000 }));
		}

		const reason = args[1] ? args.slice(1).join(' ') : 'Không lý do';

		const embed = new MessageEmbed()
			.setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

		return message.guild.fetchBans().then((bans) => {
			const user = bans.find((ban) => ban.user.id === member.id);

			if (user) {
				embed.setTitle(`Unban thành công ${user.user.tag}`)
					.setColor('#00ff00')
					.addField('ID người dùng', user.user.id, true)
					.addField('Tag người dùng', user.user.tag, true)
					.addField('Lý do ban', user.reason != null ? user.reason : 'Không lý do')
					.addField('Lý do unban', reason);
				message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed));
			} else {
				embed.setTitle(`User ${member.tag} không bị ban!`)
					.setColor('#ff0000');
				message.channel.send(embed);
			}
		}).catch((e) => {
			console.log(e);
			message.channel.send('Có lỗi xảy ra!');
		});
	},
};