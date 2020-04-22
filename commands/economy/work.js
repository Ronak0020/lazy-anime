const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = process.env.MONGODBURL;
const cooldown = new Set();

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

const Money = require("../../modules/money.js");

module.exports = {
    name: 'work',
    description: 'Work and earn coins.',
    category: "economy",
    run: async(client, message, args) => {
        let earnedCoins = Math.floor(Math.random() * 149) + 1;
if (cooldown.has(message.author.id)) {
            message.channel.send("Wait `1 hour` before using this command again. - " + message.author);
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
                coins: earnedCoins
            });

            await newMoney.save().catch(e => console.log(e));
        } else if(money) {
            money.coins = money.coins + earnedCoins;
            await money.save().catch(e => console.log(e));
        }
    });

    message.reply(`You worked hard and earned ${earnedCoins} coins!`);
        if(message.author.id === "625877119989186570") return;
        // Adds the user to the set so that they can't talk for a minute
        cooldown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldown.delete(message.author.id);
        }, 600000);
    }
    
    },
};
