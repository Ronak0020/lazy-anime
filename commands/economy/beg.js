const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = process.env.MONGODBURL;
const cooldown = new Set();

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Money = require("../../modules/money.js");

module.exports = {
    name: 'beg',
    description: 'Beg bot for coins.',
    category: "economy",
	run: async(client, message, args) => {
if (cooldown.has(message.author.id)) {
            message.channel.send("Wait `1 minute` before using this command again. - " + message.author);
    } else {
        const msg = await message.reply(`:thinking: Hmm...`);

           Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, async (err, money) => {
            if(!money) {
                const newMoney = new Money({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coins: "0",
                    bank: "0"
                })
                await newMoney.save().catch(e => console.log(e));
            }
            if(money) {
                let chance = Math.floor(Math.random() * 100) + 1;

                if (chance < 1) {
                    msg.edit("Nah, i don't give you any coins.");
                }
    
                if (chance > 0) {
                    let newCoins = Math.floor(Math.random() * 99) + 1;
                    money.coins = money.coins + newCoins;
                    money.bank = money.bank + 0;
                    await money.save().catch(e => console.log(e));
                    msg.edit(`Ok sure, have ${newCoins} coins.`);
                }
            }
        });
        if(message.author.id === "625877119989186570") return;
        cooldown.add(message.author.id);
        setTimeout(() => {
          cooldown.delete(message.author.id);
        }, 60000);
    }
        
    },
};
