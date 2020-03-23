const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
    name: "blood",
    usage: "[@user]",
    description: "Kill a a user\'s avatar!",
    category: "image fun",
    aliases: ["kill", "bloody"],
    run: async(client, message, args) => {
      let target = message.mentions.users.first() || message.author;
      let profilepic = target.avatarURL;
      if(!profilepic) return message.reply("I cant kill a user with no profile pic!");
      let url = `https://eclyssia-api.tk/api/v1/blood?url=${profilepic}`;

      message.channel.startTyping();

      snekfetch.get(url).then(async res => {
          await message.channel.send({
            files: [{
                attachment: res.body,
                name: `${target.tag}-bloody.gif`
            }]
          }).then(() => message.channel.stopTyping());
      }).catch(err => console.error(err));

}
}