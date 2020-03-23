const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
    name: "jail",
    usage: "[@user]",
    description: "Send someone to prison!",
    category: "image fun",
    aliases: ["prison"],
    run: async(client, message, args) => {
      let target = message.mentions.users.first() || message.author;
      let profilepic = target.avatarURL;
      if(!profilepic) return message.reply("I cant send a user to prison with no profile pic!");
      let url = `https://eclyssia-api.tk/api/v1/prison?url=${profilepic}`;

      message.channel.startTyping();

      snekfetch.get(url).then(async res => {
          await message.channel.send({
            files: [{
                attachment: res.body,
                name: `${target.tag}-prison.gif`
            }]
          }).then(() => message.channel.stopTyping());
      }).catch(err => console.error(err));

}
}