const Discord = require('discord.js');
const mongoose = require('mongoose');
const { formatDate } = require("../../functions.js");
const dbURL = process.env.MONGODBURL;
mongoose.connect(dbURL, {
    useNewUrlParser: true
})
const Warn = require('../../modules/warning');

module.exports = {
    name: "warnings",
    aliases: ["warnings", "warns"],
    description: "Check warnings of a user.",
    usage: "<@user>",
    category: "moderation",
    run: async(client, message, args) => {
        const created = formatDate(message.createdAt);
        const target = message.mentions.users.first() || message.guild.members.get(args[0]);
        if(!target) return message.reply("Please mention the user.").then(m => m.delete(5000));
        if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("You do not have permission to check warnings of a member.\nPermission required : `MANAGE_MESSAGES`");
        Warn.findOne({
            guildID: message.guild.id,
            userID: target.id
        }, async(err, user) => {
            if(err) console.log(err);
            if(!user) return message.reply("This user has no warnings! :tada:").then(m => m.delete(5000));
            const embed = new Discord.RichEmbed()
            .setTitle(`Warnings of **${target.username}** :`)
            .setDescription(`**Warnings (Date):** ${user.reason}\n**Given By:** ${user.mod}`)
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .setTimestamp()
            .setColor("RED")
            message.channel.send(embed);
        })
    }
}
