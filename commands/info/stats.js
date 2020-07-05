const Discord = require ("discord.js");
const mongoose = require("mongoose");
const Money = require("../../modules/stats.js");
const dbUrl = process.env.MONGODBURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

module.exports = {
    name: 'stats',
	description: 'Shows messages leaderboard for clubs in Lazy Anime server!.',
    category: "info",
    run: async(client, message, args) => {
      Money.find().sort([
        ['messages', 'descending']
      ]).exec((err, res) => {
        if (err) console.log(err);

        let lb = [];

        let embed = new Discord.RichEmbed()
          .setAuthor(`${message.guild.name} Club Leaderboard`, message.guild.iconURL)
          .setColor("BLURPLE")
          .setTimestamp();

        if (res.length === 0) {
          embed.addField("No data found.", "Please type in chat to gain messages stats!")
        } else if (res.length < 10) {
          //less than 10 results
          for (i = 0; i < res.length; i++) {
            let member = message.guild.roles.get(res[i].roleID) || "Invalid Role"
            if (member === "Invalid Role") {
               lb.push(`**${i + 1}.** ${member} • ${res[i].messages.toLocaleString()} Messages!`);
            } else {
               lb.push(`**${i + 1}.** ${member.name} • ${res[i].messages.toLocaleString()} Messages!`);
            }
          }
        } else {
          for (i = 0; i < 10; i++) {
            let member = message.guild.roles.get(res[i].roleID) || "Invalid Role"
            if (member === "Invalid Role") {
               lb.push(`**${i + 1}.** ${member} • ${res[i].messages.toLocaleString()} Messages!`);
            } else {
               lb.push(`**${i + 1}.** ${member.name} • Coins ${res[i].messages.toLocaleString()} Messages!`);
            }
          }
        }

        if(lb.length > 0) {
          embed.setDescription(`${lb.join("\n")}`);
        }

        message.channel.send(embed);
      });
    },
};
