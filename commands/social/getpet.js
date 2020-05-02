const Discord = require('discord.js')
const randomName = require('node-random-name');
const Pet = require("../../modules/pets.js");
const Coins = require("../../modules/money.js");
const mongoose = require("mongoose");
const dbUrl = process.env.MONGODBURL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
module.exports = {
    name: "getpet",
    run: async (client, message, args) => {
    //this is where the actual code for the command goes
    await message.delete();
    let name = randomName({
        first: true
    });
    Pet.findOne({
        ownerID: message.author.id
    }, (err, res) => {
        if (err) console.log(err);
        if (!res) {
            Coins.findOne({
                userID: message.author.id,
                serverID: message.guild.id
            }, (err, coins) => {
                if (err) console.log(err)
                if (!coins) return message.reply("Sorry, you don't have any coins.");
                if (coins.coins < 1000) return message.reply("Sorry, you need 1 coins to buy a pet.")
                        coins.coins = coins.coins - 1000;
                        coins.save().catch(err => console.log(err));

                        const newDoc = new Pet({
                            petName: name,
                            ownerID: message.author.id,
                            ownerUsername: message.author.username,
                        })
                        let embed = new Discord.RichEmbed()
                            .setTitle("Pet Spawned!")
                            .setColor("BLURPLE")
                            .setThumbnail(message.author.displayAvatarURL)
                            .addField("Pet Name", name)
                            .addField("XP/LVL: ", "0/1");

                        message.channel.send(embed);
                        newDoc.save().catch(err => console.log(err));
                }).catch(err => {
                    message.channel.send(err).then(m => m.delete(5000))
                })
        } else {
            return message.reply("Sorry, you already have a pet named " + res.petName + ".").then(r => r.delete(5000))
        }
})
}
}
