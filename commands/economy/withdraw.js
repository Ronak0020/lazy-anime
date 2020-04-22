const Discord = require('discord.js');
const mongoose = require('mongoose');
const dbUrl = process.env.MONGODBURL;
const cooldown = new Set();

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Coins = require('../../modules/money.js');

module.exports = {
    name: "withdraw",
    category: "economy",
    aliases: ["with"],
    usage: "<amount>",
    description: "Withdraw your coins from your bank to cash.",
    run: async(client, message, args) => {
        Coins.findOne({
            serverID: message.guild.id,
            userID: message.author.id
        }, async(err, money) => {
            if(err) console.log(err);
            const amt = args[0];
            if(!amt || isNaN(amt)) return message.channel.send("Please specify the amount you want to withdraw from bank.").then(m => m.delete(5000));;
            if(amt > money.bank) return message.reply("You do not have enough money in bank!");
            if(!money.bank) return message.reply("You do not have any money in bank.");
            money.coins += Math.floor(parseInt(amt));
            money.bank = money.bank - amt;
            await money.save().catch(e => console.log(e));
            message.reply(`Successfully withdrew ${amt} coins from your bank!`)
        })
    }
}
