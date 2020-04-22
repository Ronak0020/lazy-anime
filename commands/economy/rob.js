const Discord = require('discord.js');
const mongoose = require('mongoose');
const dbUrl = process.env.MONGODBURL;
const cooldown = new Set();

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Coins = require('../../modules/money.js');

module.exports = {
    name: 'rob',
    category: "economy",
    description: "Rob someone! If u r lucky, u will succeed!",
    aliases: ["steal"],
    usage: "<@user>",
    run: async(client, message, args) => {
        if (cooldown.has(message.author.id)) {
          message.channel.send("Wait `30 seconds` before using this command again. - " + message.author);
  } else {

        let target = message.mentions.members.first();
        if (!target || target.id === message.author.id) return message.reply("Mention a valid member whom you wanna rob! (You also cant rob yourself!)").then(m => m.delete(5000));
      
        Coins.findOne({
          userID: message.author.id,
          serverID: message.guild.id
        }, (err, sendres) => {
          if (err) console.log(err);

            Coins.findOne({
              userID: target.id,
              serverID: message.guild.id
            }, (err, targetres) => {
              if (err) console.log(err);
                if(sendres.coins < 500) return message.reply("You must have at least 500 coins in cash.Withdraw some or earn some.");
                let chance = Math.floor(Math.random() * 100) + 1;
              if(chance < 50) {
              sendres.coins = sendres.coins - 500;
              sendres.save().catch(err => console.log(err));
              targetres.coins = targetres.coins + 500
              targetres.save().catch(err => console.log(err));
              message.channel.send(`:money_with_wings: Oh No! You were caught robbing **${target.displayName}** and you paid him **500 coins** as a fine! :money_with_wings:`);
              }

              let amt = Math.floor(Math.random() * targetres.coins) - 1;
      
              if(chance > 50){
                sendres.coins = sendres.coins + amt;
                sendres.save().catch(err => console.log(err));
                targetres.coins = targetres.coins - amt;
                targetres.save().catch(err => console.log(err))
                message.channel.send(`:money_mouth: Yes! You successfully robbed **${target.displayName}**! Your payout was **${amt}**! :money_mouth:`);
              }
            })
          }
      
        )
        if(message.author.id === "625877119989186570") return;
        cooldown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldown.delete(message.author.id);
        }, 30000);
    }
        }
}
