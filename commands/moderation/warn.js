const Discord = require('discord.js');
const mongoose = require('mongoose');
const dbURL = process.env.MONGODBURL;
const { formatDate } = require("../../functions.js");
mongoose.connect(dbURL, {
    useNewUrlParser: true
})
const Warn = require('../../modules/warning');

module.exports = {
    name: 'warn',
    usage: "<@member> <reason>",
    category: "moderation",
    description: "Warn a member for breaking rules!",
    run: async(client, message, args) => {
        const created = formatDate(message.createdAt);
        const target = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(target.hasPermission(["ADMINISTRATOR"])) return message.reply("You can not warn an Admin. This person seems to be an Admin of this server.").then(m => m.delete(5000));
        if(!target) return message.reply("Whom you wanna warn? Please mention the user.").then(m => m.delete(5000));
        const reason = args.slice(1).join(" ");
        if(!reason) return message.reply("Please provide a reason to warn!").then(m => m.delete(5000));
        if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("You do not have permission to warn a member.\nPermission required : `MANAGE_MESSAGES`");
        Warn.findOne({
            guildID: message.guild.id,
            userID: target.id
        }, async(err, user) => {
            if(err) console.log(err);
            if(!user) {
                const newWarn = new Warn({
                    guildID: message.guild.id,
                    userID: target.id,
                    mod: message.author.username,
                    reason: reason + ` (${created})`
                })
                await newWarn.save().catch(e => console.log(e));
            } else if(user) {
                user.reason = user.reason + "\n" + reason + `  (${created})`,
                user.mod = user.mod + "\n" + message.author.username
                await user.save().catch(e => console.log(e));
            }
            const embed = new Discord.RichEmbed()
            .setTitle("⚠ You have been warned! ⚠")
            .setDescription(`**Server -** ${message.guild.name}\n**Moderator -** ${message.author.username}\n**Reason -** ${reason}\n**Date -** ${created}`)
            .setColor("RED")
            .setFooter(client.user.username, client.user.displayAvatarURL)
            target.send(embed);
            message.channel.send(`Successfully warned **${target.user.tag}**!`)
        })
    }
}
