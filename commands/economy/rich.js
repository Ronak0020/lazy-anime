const Discord = require ("discord.js");
const mongoose = require("mongoose");
const Money = require("../../modules/money.js");
const dbUrl = process.env.MONGODBURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

module.exports = {
    name: 'rich',
	description: 'Shows coin leaderboard for current server.',
    category: "economy",
    run: async(client, message, args) => {
      Money.find({
        serverID: message.guild.id
      }).sort([
        ['coins', 'descending']
      ]).exec((err, res) => {
        if (err) console.log(err);

        let lb = [];

        let embed = new Discord.RichEmbed()
          .setAuthor(`${message.guild.name} Leaderboard`, message.guild.iconURL)
          .setColor("BLURPLE")
          .setTimestamp();

        if (res.length === 0) {
          embed.addField("No data found.", "Please type in chat to gain coins!")
        } else if (res.length < 10) {
          //less than 10 results
          for (i = 0; i < res.length; i++) {
            let member = message.guild.members.get(res[i].userID) || "Invalid User#0000"
            if (member === "Invalid User#0000") {
               lb.push(`**${i + 1}.** ${member} • ${res[i].coins.toLocaleString()} Coins`);
            } else {
               lb.push(`**${i + 1}.** ${member.user.tag} • ${res[i].coins.toLocaleString()} Coins`);
            }
          }
        } else {
          for (i = 0; i < 10; i++) {
            let member = message.guild.members.get(res[i].userID) || "Invalid User#0000"
            if (member === "Invalid User#0000") {
               lb.push(`**${i + 1}.** ${member} • ${res[i].coins.toLocaleString()} Coins`);
            } else {
               lb.push(`**${i + 1}.** ${member.user.tag} • Coins ${res[i].coins.toLocaleString()}`);
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
