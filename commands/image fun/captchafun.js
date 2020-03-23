const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
    name: "captcha",
    usage: "[@user]",
    description: "Get a captcha for a user\'s avatar!",
    category: "image fun",
    run: async(client, message, args) => {
      let target = message.mentions.users.first() || message.author;
      let profilepic = target.avatarURL;
      if(!profilepic) return message.reply("I cant make a captcha of a user with no profile pic!");
      let url = `https://eclyssia-api.tk/api/v1/captcha?url=${profilepic}&username=${target.username}`;

      snekfetch.get(url).then(async res => {
          await message.channel.send({
            files: [{
                attachment: res.body,
                name: `${target.tag}-captcha.gif`
            }]
          });
      }).catch(err => console.error(err));

}
}