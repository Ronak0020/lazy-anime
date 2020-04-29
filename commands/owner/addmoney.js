const Discord = require('discord.js')
const mongoose = require("mongoose")
const dbUrl = process.env.MONGODBURL;
mongoose.connect(dbUrl, {
  useNewUrlParser: true
});
const Coins = require("../../modules/money.js");

module.exports = {
    name: "add-money",
    aliases: ["addmoney", "givemoney", "addcoins"],
    description: "Owner can add money to user's cash/bank.",
    usage: "<cash | bank> <amount>",
    category: "owner",
    run: async(client, message, args) => {
        const options = [
            "cash",
            "bank"
        ];
        if(!message.author.id === "603508758626435072") return message.reply("You are not my owner! u can not use this command!");
        let target = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!args[1]) return message.channel.send("Where to add coins? cash or bank? plz be specific.");
        //if(!args[1].content.toLowerCase() === options) return message.reply("This is not a valid option to add money in.");
        const amount = parseInt(args[2]);
        if(!amount) return message.reply("Uhh... how much money u wanna add dumbo god?");
        Coins.findOne({
            serverID: message.guild.id,
            userID: target.id
        }, async(err, user) => {
            if(err) console.log(err);
            if(args[1].toLowerCase() === "cash") {
                user.coins += amount;
                await user.save().catch(e => console.log(e));
                message.channel.send(`Successfully Added ${amount} coins to ${target.user.username}'s cash account.`);
            } else if(args[1].toLowerCase() === "bank") {
                user.bank += amount;
                await user.save().catch(e => console.log(e));
                message.channel.send(`Successfully Added ${amount} coins to ${target.user.username}'s bank account.`);
            }
        })
    }
}
