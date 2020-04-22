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
    name: "rep",
    category: "social",
    description: "Give a user +1 rep point",
    usage: "<@user>",
    run: async(client, message, args) => {
        if (cooldown.has(message.author.id)) {
            message.channel.send("Wait `12 hours` before using this command again. - " + message.author);
    } else {
        const target = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!target) return message.reply("Whom you wanna give a rep point?")
        if(target.id === message.author.id) return message.reply("You can not give a rep point to yourself.");
        Profile.findOne({
            userID: target.id
        }, async(err, user) => {
            if(err) console.log(err);
            user.rep += 1;
            await user.save().catch(e => console.log(e));
            message.channel.send(`${message.member.displayName} has successfully given +1 rep points to **${target.displayName}**`)
        })
        if(message.author.id === "625877119989186570") return;
        // Adds the user to the set so that they can't talk for a minute
        cooldown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldown.delete(message.author.id);
        }, 12 * 60 * 60 * 1000);
    }
    }
}
