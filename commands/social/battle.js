const Discord = require('discord.js')
const Coins = require("../../modules/money.js");
const battleUtils = require("../../utils/battle.js");
const mongoose = require("mongoose");
const dbUrl = process.env.MONGODBURL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
module.exports = {
    name: "battle",
    category: "social",
    description: "Battle with another player and win coins.",
    usage: "<@user> <amount to challenge for>",
    aliases: ["fight"],
    run: async (client, message, args) => {
  //this is where the actual code for the command goes
  let target = message.mentions.members.first();
  let author1 = message.author.username;
  if (!target) return message.reply("Please mention a member to battle!").then(r => r.delete(10000));
  if(target.id === message.author.id) return message.reply("You can not battle with yourself.").then(r => r.delete(5000));
  let price = parseInt(args[1]);
  if (!price || isNaN(price) || price < 1) return message.reply("Please try that again... ").then(r => r.delete(10000));
  let embed = new Discord.RichEmbed()
    .setTitle("Battle!")
    .setColor("BLURPLE")
    .setDescription(price + " coins at stake");
  Coins.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, res) => {
    if (err) console.log(err);
    if (!res || res.coins < price) return message.reply("Sorry but you dont have enough coins for that").then(r => r.delete(10000));
    Coins.findOne({
      userID: target.id,
      serverID: message.guild.id
    }, (err, targetres) => {
      if (err) console.log(err)
      if (!targetres || targetres.coins < price) return message.reply("Sorry but the target doesn't have enough coins for that").then(r => r.delete(10000));
      var fighter1 = message.author.id;
var fighter2 = target.id;
var challenged = target.toString();
    message.channel.send(`${challenged}, ${author1} has challenged you to a duel. Do you accept the challenge? Type: \`yes\` or \`no\``)
        .then(() => {
            message.channel.awaitMessages(response => response.author.id === fighter2, {
                max: 1,
                time: 60000,
                errors: ['time'],
            })
            .then((collected) => {
                if(collected.first().content === 'yes') {
                    message.channel.send(`accepted the challenge!`);
                    let chance = Math.floor(Math.random() * 100) + 1;
            console.log(chance)
            if (chance < 50) {
              //sender wins
              battleUtils.recordSave(message, message.member, target);
              targetres.coins = targetres.coins - price;
              res.coins = res.coins + price;
              embed.addField("Winner", message.author);
              embed.addField("Loser", target);
            } else {
              //target wins
              battleUtils.recordSave(message, target, message.member);
              targetres.coins = targetres.coins + price;
              res.coins = res.coins - price;
              embed.addField("Winner", target);
              embed.addField("Loser", message.author);
            }
            //end
            targetres.save().catch(err => console.log(err));
            res.save().catch(err => console.log(err));
            message.channel.send(embed);
                } else {
                    if(collected.first().content === 'no') {
                      return message.channel.send(target + ", Canceled... " + message.author).then(r => r.delete(10000));
                }
            }
            })
            .catch(() => {
                message.channel.send(`No response. Fight has been cancelled.`);
            });
      }).catch(err => {
        message.reply(" - " + target + " Time limit exceeded " + err.message).then(r => r.delete(5000));
      })
      });
    });
  }
}
