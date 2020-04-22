const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = process.env.MONGODBURL;
const cooldown = new Set();

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Money = require("../../modules/money.js");

module.exports = {
    name: 'search',
    description: 'Search far and wide for coins.',
    category: "economy",
    run: async(client, message, args) => {
if (cooldown.has(message.author.id)) {
            message.channel.send("Wait `1 minute` before using this command again. - " + message.author);
    } else {

           Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, async (err, money) => {
            if(err) console.log(err);

            const coinz = Math.floor(Math.random() * 79) + 1;
            if(!money) {
                const newMoney = new Money({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coins: coinz
                });
                if(message.author.avatarURL === null) message.author.avatarURL = "https://mraugu.ga/avam_assets/pfp.png";
                await newMoney.save().catch(e => console.log(e));
                let embed = new Discord.RichEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(`You searched far and wide and found ${coinz} coins.`)
                    .setColor("BLURPLE")
                    .setTimestamp();

                message.channel.send(embed);
            }

            if(money) {
                let embed = new Discord.RichEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(`You searched far and wide and found ${coinz} coins.`)
                    .setColor("BLURPLE")
                    .setTimestamp();
                money.coins = money.coins + coinz;
                await money.save().catch(e => console.log(e));
                message.reply(embed);

            }
        });
        if(message.author.id === "625877119989186570") return;
        // Adds the user to the set so that they can't talk for a minute
        cooldown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldown.delete(message.author.id);
        }, 60000);
    }
        
    },
};
