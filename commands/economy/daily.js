const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = process.env.MONGODBURL;
const talkedRecently = new Set();

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Money = require("../../modules/money.js");

module.exports = {
    name: 'daily',
  	description: 'Get your daily bonus.',
    category: "economy",
	run: async(client, message, args) => {

        let dailyCoins = 250;
if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 1 day to get your daily bonus again. - " + message.author);
    } else {

           Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, async (err, money) => {
            if(err) console.log(err);
            if(!money) {
                const newMoney = new Money({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coins: dailyCoins
                });

                await newMoney.save().catch(e => console.log(e));
            } else if(money) {
                money.coins = money.coins + dailyCoins;
                await money.save().catch(e => console.log(e));
            }
        });

        message.channel.send(`${message.author.username} You got a daily bonus of ${dailyCoins} coins.`);
        if(message.author.id === "625877119989186570") return;
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 86400000);
    }

         },
};
