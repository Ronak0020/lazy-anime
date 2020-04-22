const Discord = require('discord.js');
const mongoose = require('mongoose');
const dbUrl = process.env.MONGODBURL;
const cooldown = new Set();

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Coins = require('../../modules/money.js');

module.exports = {
    name: "deposit",
    category: "economy",
    aliases: ["dep"],
    usage: "<amount>",
    description: "Deposit your cash into your bank to avoid getting robbed.",
    run: async(client, message, args) => {
        Coins.findOne({
            serverID: message.guild.id,
            userID: message.author.id
        }, async(err, money) => {
            if(err) console.log(err);
            const amt = args[0];
            if(!amt || isNaN(amt)) return message.channel.send("Please specify the amount you want to deposit to bank.").then(m => m.delete(5000));;
            if(amt > money.coins) return message.reply("You do not have enough cash!");
            if(!money.coins) return message.reply("You do not have any cash.");
            money.bank += Math.floor(parseInt(amt));
            money.coins = money.coins - amt;
            await money.save().catch(e => console.log(e));
            message.reply(`Successfully depositted ${amt} coins into your bank!`)
        })
    }
}
