const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
	name: "tickle",
	category: "actions",
	description: "tickle someone! (・∀・)",
        usage: "<user mention whom you wanna tickle>",
	run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
      try {
      const author = message.author.username;
      const user = message.mentions.users.first().username;
      if(!user) return message.reply("Please mention a person whom you wanna tickle! (ㆁωㆁ)").then(m => m.delete(5000));
      const data = await (await fetch('https://nekos.life/api/v2/img/tickle')).json();
      if (!(data || data.url)) return message.reply('NO_DATA').then(m => m.delete(5000));
      const ticklee = new Discord.RichEmbed()
          .setTitle(`**${author}** is tickling to **${user}** (ㆁωㆁ)`, true)
          .setImage(data.url)
          .setColor('RANDOM')
           message.channel.send(ticklee);
    } catch (error) {
      console.log(error);
      return message.reply('Please mention a person whom you wanna tickle!').then(m => m.delete(5000));
    }
		}
	}
