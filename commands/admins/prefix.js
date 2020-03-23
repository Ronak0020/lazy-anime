const Discord = require('discord.js');
const mongoose = require('mongoose');
const dbURL = 'mongodb://heroku_85nc06pf:t03p8l1j1smlo9ct6fi5bovp02@ds259738.mlab.com:59738/heroku_85nc06pf';
mongoose.connect(dbURL, {
    useNewUrlParser: true
})
const Module = require('../../modules/module');

module.exports = {
    name: "pefix",
    aliases: ["prefix", "setprefix"],
    description: "Change the prefix of the bot for your server.",
    category: "admins",
    usage: "<new prefix>",
    run: async(client, message, args) => {
        Module.findOne({
            guildID: message.guild.id
        }, async(err, server) => {
            if(err) console.log(err);
            if(!message.member.hasPermission(["MANAGE_SERVER"])) return message.reply("Sorry, you do not have permission to use this command.\n Permission Required: `MANAGE_SERVER`").then(m => m.delete(5000));
            if(!args[0]) message.reply("Please tell me the new prefix for this guild with the command.").then(m => m.delete(10000));

            server.prefix = args[0];
            await server.save().catch(e => console.log(e));
            message.channel.send("Successfully set `" + args[0] + "` as Prefix!")
        })
    }
}