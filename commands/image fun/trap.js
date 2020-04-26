const Discord = require('discord.js');
const { get } = require('snekfetch');

module.exports = {
    name: "trap",
    usage: "[@user]",
    description: "Wanna trap someone?",
    category: "image fun",
    run: async(client, message, args) => {
      let target = message.mentions.users.first();
      let profilepic = target.avatarURL;
      if(!profilepic) return;
      const { body } = await get(`https://nekobot.xyz/api/imagegen?type=trap&name=${target.username}&author=${message.author.username}&image=${profilepic}`);
      const emb = new Discord.RichEmbed()
      .setImage(body.message)
      .setTimestamp()
      .setColor("RANDOM")
      .setFooter(client.user.username, client.user.displayAvatarURL);
      message.channel.send(emb);
}
}
