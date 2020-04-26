const Discord = require('discord.js');
const { get } = require('snekfetch');

module.exports = {
    name: "baguette",
    usage: "[@user]",
    description: "Have some breads.",
    category: "image fun",
    run: async(client, message, args) => {
      let target = message.mentions.users.first() || message.author;
      let profilepic = target.avatarURL;
      if(!profilepic) return;
      const { body } = await get(`https://nekobot.xyz/api/imagegen?type=baguette&url=${profilepic}`);
      const emb = new Discord.RichEmbed()
      .setImage(body.message)
      .setTimestamp()
      .setColor("RANDOM")
      .setFooter(client.user.username, client.user.displayAvatarURL);
      message.channel.send(emb);
}
}
