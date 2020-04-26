const Discord = require('discord.js');
const { get } = require('snekfetch');

module.exports = {
    name: "captcha",
    usage: "[@user]",
    description: "Get a captcha for a user\'s avatar!",
    category: "image fun",
    run: async(client, message, args) => {
      let target = message.mentions.users.first() || message.author;
      let profilepic = target.avatarURL;
      if(!profilepic) return message.reply("I cant make a captcha of a user with no profile pic!");
      const { body } = await get(`https://nekobot.xyz/api/imagegen?type=captcha&url=${profilepic}&username=${target.username}`);
      const emb = new Discord.RichEmbed()
      .setImage(body.message)
      .setTimestamp()
      .setColor("RANDOM")
      .setFooter(client.user.username, client.user.displayAvatarURL);
      message.channel.send(emb);
}
}
