const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const mongoose = require('mongoose');
const dbURL = process.env.MONGODBURL;

mongoose.connect(dbURL, {
    useNewUrlParser: true
})
const Module = require('../../modules/module');

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks the member",
    usage: "<id | mention>",
    run: async (client, message, args) => {

        Module.findOne({
            guildID: message.guild.id,
        }, async(err, server) => {
            if(err) console.log(err);
            const logChannel = message.guild.channels.find(c => c.name === server.logChannel) || message.channel;

            if (message.deletable) message.delete();
    
            // No args
            if (!args[0]) {
                return message.reply("Please provide a person to kick.")
                    .then(m => m.delete(5000));
            }
    
            // No reason
            if (!args[1]) {
                return message.reply("Please provide a reason to kick.")
                    .then(m => m.delete(5000));
            }
    
            // No author permissions
            if (!message.member.hasPermission("KICK_MEMBERS")) {
                return message.reply("❌ You do not have permissions to kick members. Please contact a staff member")
                    .then(m => m.delete(5000));
            }
    
            // No bot permissions
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
                return message.reply("❌ I do not have permissions to kick members. Please contact a staff member")
                    .then(m => m.delete(5000));
            }
    
            const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);
    
            // No member found
            if (!toKick) {
                return message.reply("Couldn't find that member, try again")
                    .then(m => m.delete(5000));
            }
    
            // Can't kick urself
            if (toKick.id === message.author.id) {
                return message.reply("You can't kick yourself...")
                    .then(m => m.delete(5000));
            }
    
            // Check if the user's kickable
            if (!toKick.kickable) {
                return message.reply("I can't kick that person due to role hierarchy, I suppose.")
                    .then(m => m.delete(5000));
            }
                    
            const embed = new RichEmbed()
                .setColor("#ff0000")
                .setThumbnail(toKick.user.displayAvatarURL)
                .setFooter(message.member.displayName, message.author.displayAvatarURL)
                .setTimestamp()
                .setDescription(stripIndents`**- Kicked member:** ${toKick} (${toKick.id})
                **- Kicked by:** ${message.member} (${message.member.id})
                **- Reason:** ${args.slice(1).join(" ")}`);
    
            const promptEmbed = new RichEmbed()
                .setColor("GREEN")
                .setAuthor(`This verification becomes invalid after 30s.`)
                .setDescription(`Do you want to kick ${toKick}?`)
    
            // Send the message
            await message.channel.send(promptEmbed).then(async msg => {
                // Await the reactions and the reaction collector
                const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
    
                // The verification stuffs
                if (emoji === "✅") {
                    msg.delete();
    
                    const DMChannel = toKick.createDM.channel;
                     toKick.createDM()
                     .then((DMChannel) => {
                     	DMChannel.send(`You were kicked from server __${message.guild.name}__ \n> **REASON :-**\n> ***${args.slice(1).join(" ")}***`)
                     	.then(() => {
                     		toKick.kick(args.slice(1).join(" "))
                     	})
                        });
    
                    logChannel.send(embed);
                } else if (emoji === "❌") {
                    msg.delete();
    
                    message.reply(`Kick canceled.`)
                        .then(m => m.delete(10000));
                }
            });  
        })
    }
};
