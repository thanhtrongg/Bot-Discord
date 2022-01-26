const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'server-info',
	category: 'extra',
	run: async (bot, message, args) => {
		let region;
		switch (message.guild.region) {
		case 'europe':
			region = '🇪🇺 Europe';
			break;
		case 'us-east':
			region = '🇺🇸 us-east';
			break;
		case 'us-west':
			region = '🇺🇸 us-west';
			break;
		case 'us-south':
			region = '🇺🇸 us-south';
			break;
		case 'us-central':
			region = '🇺🇸 us-central';
			break;
		default:
			region = 'Unknown';
		}

		const embed = new MessageEmbed()
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setColor('#f3f3f3')
			.setTitle(`${message.guild.name}`)
			.addFields(
				{
					name: 'Chủ Nhóm: ',
					value: message.guild.owner.user.tag,
					inline: true,
				},
				{
					name: 'Thành Viên: ',
					value: `Có ${message.guild.memberCount} thành viên!`,
					inline: true,
				},
				{
					name: 'Ngày Tạo: ',
					value: message.guild.createdAt.toLocaleDateString('en-us'),
					inline: true,
				},
				{
					name: 'Số Roles: ',
					value: `Có ${message.guild.roles.cache.size} roles trong Server.`,
					inline: true,
				},
				{
					name: '🗺 Quốc Gia: ',
					value: region,
					inline: true,
				},
				{
					name: 'Verified: ',
					value: message.guild.verified ? 'Server đã được xác minh' : 'Server chưa được xác minh',
					inline: true,
				},
				{
					name: 'Boosters: ',
					value: message.guild.premiumSubscriptionCount >= 1 ? `Có ${message.guild.premiumSubscriptionCount} Boosters` : 'Không có boosters',
					inline: true,
				},
				{
					name: 'Emojis: ',
					value: message.guild.emojis.cache.size >= 1 ? `Có ${message.guild.emojis.cache.size} emojis!` : 'Không có emojis',
					inline: true,
				},
			);
		return message.channel.send(embed);
	},
};