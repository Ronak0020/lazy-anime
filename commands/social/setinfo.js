const Discord = require('discord.js');
const mongoose = require('mongoose');
const dbURL = process.env.MONGODBURL;
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const Profile = require('../../modules/profile');
const cooldown = new Set();

module.exports = {
    name: "setinfo",
    category: "social",
    description: "Edit your profile info.",
    usage: "<about | title> <new value>",
    run: async(client, message, args) => {
        if(!((args[0].toLowerCase() === "about") || (args[0].toLowerCase() === "title"))) return message.reply("What you wanna edit? about or title?");
        Profile.findOne({
            userID: message.author.id
        }, async(err, user) => {
            if(err) console.log(err);
            if(args[0].toLowerCase() === "about") {
                user.about = args.slice(1).join(" ");
                await user.save().catch(e => console.log(e));
                message.reply(`Successfully set **${args.slice(1).join(" ")}** as your profile about!`);
            } else if(args[0].toLowerCase() === "title") {
                user.title = args.slice(1).join(" ");
                await user.save().catch(e => console.log(e));
                message.reply(`Successfully set **${args.slice(1).join(" ")}** as your profile title!`);
            }
        })
    }
}
