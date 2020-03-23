const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
    name: "beautiful",
    usage: "[@user]",
    description: "Get a beautiful image for a user\'s avatar!",
    category: "image fun",
    aliases: ["beauty", "beautify"],
    run: async(client, message, args) => {
      let target = message.mentions.users.first() || message.author;
      let profilepic = target.avatarURL;
      if(!profilepic) return message.reply("I cant tell beautiful to a user with no profile pic!");
      let url = `https://eclyssia-api.tk/api/v1/beautiful?url=${profilepic}`;

      message.channel.startTyping();

      snekfetch.get(url).then(async res => {
          await message.channel.send({
            files: [{
                attachment: res.body,
                name: `${target.tag}-beautiful.gif`
            }]
          }).then(() => message.channel.stopTyping());
      }).catch(err => console.error(err));

}
}