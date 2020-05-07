const Discord = require('discord.js');
const mongoose = require('mongoose');
const dbURL = process.env.MONGODBURL;
mongoose.connect(dbURL, {
    useNewUrlParser: true
})
const Warn = require('../../modules/warning');

module.exports = {
    name: "clearwarnings",
    aliases: ["clearwarns", "removewarns"],
    usage: "<@user>",
    category: "moderation",
    description: "Clear all the warnings of a user.",
    run: async(client, message, args) => {
        const target = message.mentions.users.first() || message.guild.members.get(args[0]);
        if(!target) return message.reply("Whom you wanna warn? Please mention the user.").then(m => m.delete(5000));
        if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("You do not have permission to check warnings of a member.\nPermission required : `MANAGE_MESSAGES`");
        Warn.findOne({
            guildID: message.guild.id,
            userID: target.id
        }, async(err, user) => {
            if(err) console.log(err);
            user.delete().catch(e => console.log(e));
            message.channel.send(`Cleared warnings for user **${target.username}**`)
        })
    }
}
