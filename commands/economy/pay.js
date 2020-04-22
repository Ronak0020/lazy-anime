const Discord = require('discord.js')
const mongoose = require("mongoose")
const dbUrl = process.env.MONGODBURL;
mongoose.connect(dbUrl, {
  useNewUrlParser: true
});
const Coins = require("../../modules/money.js");


module.exports = {
    name: 'pay',
    category: "economy",
    aliases: ["give"],
    description: "Your friend is poor? Give them some coins from your wallet!",
    usage: "<user mention> <amount>",
    run: async(client, message, args) => {

        let target = message.mentions.members.first();
        if (!target || target.id === message.author.id) return message.reply("Mention a valid member whom you wanna pay! (You also cant pay yourself!)").then(m => m.delete(5000));
        if(target.user.bot) return message.reply("Dont waste your money on NON-HUMANS!");
        let amt = parseInt(args[1]);
        if (isNaN(amt) || amt < 1) return message.reply("Please enter a valid amount").then(r => r.delete(5000));

        let embed = new Discord.RichEmbed()
            .setTitle("Pay")
            .setThumbnail(message.author.displayAvatarURL);

        Coins.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, (err, sendres) => {
            if (err) console.log(err);

            if (!sendres) {
            embed.setColor("RED");
            embed.addField("Error", "Sorry, you don't have any coins in this server...");
            return message.channel.send(embed);
            } else {
            if (amt > sendres.coins) return message.reply("Sorry, thats more coins than what you have!").then(r => r.delete(10000));
            Coins.findOne({
                userID: target.id,
                serverID: message.guild.id
            }, (err, targetres) => {
                if (err) console.log(err);

                //remove coins from sender
                sendres.coins = sendres.coins - amt;
                sendres.save().catch(err => console.log(err));

                if (!targetres) {
                const newTargetRes = new Coins({
                    userID: target.id,
                    serverID: message.guild.id,
                    coins: amt
                })
                newTargetRes.save().catch(err => console.log(err))
                } else {
                targetres.coins = targetres.coins + amt;
                targetres.save().catch(err => console.log(err))
                }
            })

            embed.setColor("BLURPLE")
            embed.addField("Coins sent!", amt + " coins have been sent to " + target.user.username + ".")
            message.channel.send(embed);
            }


        })

}
}
