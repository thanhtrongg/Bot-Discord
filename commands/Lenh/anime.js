const Discord = require('discord.js');

module.exports =  {
  name: "anime",
  category: "info",
  description: "Get the information about any anime",
  usage: "anime <name>",
  run: async (client, message, args) => {
    //checking args
   if (!args[0]) {
     return message.channel.send("Nhập tên anime cần tìm");
      
    }
    //main part
        const search = args.join(" ");
        try {
            const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(search)}&page[limit]=1`);
            if (!response.ok) throw new Error(`Kitsu request failed with status ${response.status}`);

            const result = await response.json();
            const anime = result.data?.[0]?.attributes;
            if (!anime) return message.channel.send(`Không tìm thấy kết quả **${search}**!`);

            const title = anime.titles?.en || anime.titles?.en_jp || anime.titles?.ja_jp || search;
            const poster = anime.posterImage?.original || anime.posterImage?.large;
            const synopsis = (anime.synopsis || 'Không có mô tả.').replace(/<[^>]*>/g, '').split('\n')[0];

            let embed = new Discord.MessageEmbed()
                .setColor('#FF2050')
                .setAuthor(`${title} | ${anime.showType || 'Anime'}`, poster)
                .setDescription(synopsis)
                .addField('❯ Information', `• Japanese Name: ${anime.titles?.ja_jp || 'N/A'}\n• Age Rating: ${anime.ageRating || 'N/A'}\n• NSFW: ${anime.nsfw ? 'Yes' : 'No'}`, true)
                .addField('❯ Stats', `• Average Rating: ${anime.averageRating || 'N/A'}\n• Rating Rank: ${anime.ratingRank || 'N/A'}\n• Popularity Rank: ${anime.popularityRank || 'N/A'}`, true)
                .addField('❯ Status', `• Episodes: ${anime.episodeCount || 'N/A'}\n• Start Date: ${anime.startDate || 'N/A'}\n• End Date: ${anime.endDate || 'Still airing'}`, true);

            if (poster) embed.setThumbnail(poster);

            return message.channel.send(embed)
        } catch (err) {
            console.log(err)
            return message.channel.send(`Không tìm thấy kết quả **${search}**!`);
        }
    }

}
