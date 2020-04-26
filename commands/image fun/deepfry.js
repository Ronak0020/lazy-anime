const Discord = require('discord.js');
const { get } = require('snekfetch');

module.exports = {
    name: "deepfry",
    usage: "[@user]",
    description: "Someone is frying i guess.",
    category: "image fun",
    run: async(client, message, args) => {
      let target = message.mentions.users.first() || message.author;
      let profilepic = target.avatarURL;
      if(!profilepic) return;
      const { body } = await get(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${profilepic}`);
      const emb = new Discord.RichEmbed()
      .setImage(body.message)
      .setTimestamp()
      .setColor("RANDOM")
      .setFooter(client.user.username, client.user.displayAvatarURL);
      message.channel.send(emb);
}
}
