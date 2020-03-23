const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
    name: "gay",
    usage: "[@user]",
    description: "Make a user\'s avatar GAY!",
    category: "image fun",
    run: async(client, message, args) => {
      let target = message.mentions.users.first() || message.author;
      let profilepic = target.avatarURL;
      if(!profilepic) return message.reply("I cant tell gay to a user with no profile pic!");
      let url = `https://eclyssia-api.tk/api/v1/gay?url=${profilepic}`;

      message.channel.startTyping();

      snekfetch.get(url).then(async res => {
          await message.channel.send({
            files: [{
                attachment: res.body,
                name: `${target.tag}-gay.gif`
            }]
          }).then(() => message.channel.stopTyping());
      }).catch(err => console.error(err));

}
}