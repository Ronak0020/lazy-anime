const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
	name: "poke",
	category: "actions",
	description: "poke someone! (・∀・)",
        usage: "<user mention whom you wanna poke ರ╭╮ರ>",
	run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
      try {
      const author = message.author.username;
      const user = message.mentions.users.first().username;
      if(!user) return message.reply("Please mention a person whom you wanna poke! ರ╭╮ರ").then(m => m.delete(5000));
      const data = await (await fetch('https://nekos.life/api/v2/img/poke')).json();
      if (!(data || data.url)) return message.reply('NO_DATA').then(m => m.delete(5000));
      const ticklee = new Discord.RichEmbed()
          .setTitle(`**${author}** pokes **${user}** ರ╭╮ರ`, true)
          .setImage(data.url)
          .setColor('RANDOM')
           message.channel.send(ticklee);
    } catch (error) {
      console.log(error);
      return message.reply('Please mention a person whom you wanna poke!').then(m => m.delete(5000));
    }
		}
	}
