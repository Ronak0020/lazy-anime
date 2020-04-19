const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbURL = process.env.MONGODBURL;
const AFK = require("../../modules/afk");

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    name: "afk",
    category: "info",
    description: "Set your AFK to let every person know who pings you that u r not available atm.",
    usage: "[reason]",
    run: async(client, message, args) => {
        const reason = args.join(" ") || "AFK";
        AFK.findOne({
            guildID: message.guild.id,
            userID: message.author.id
        }, async(err, afk) => {
            if(err) console.log(err);
            if(!afk) {
                const newAFK = new AFK({
                    guildID: message.guild.id,
                    userID: message.author.id,
                    reason: reason
                })
                await newAFK.save().catch(e => console.log(e));
                message.reply(`I set your AFK: ${reason}`);
            }
        })
    }
}
