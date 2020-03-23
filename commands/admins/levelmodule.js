const Discord = require('discord.js');
const mongoose = require('mongoose');
const dbURL = 'mongodb://heroku_85nc06pf:t03p8l1j1smlo9ct6fi5bovp02@ds259738.mlab.com:59738/heroku_85nc06pf';
mongoose.connect(dbURL, {
    useNewUrlParser: true
})
const Module = require('../../modules/module');

module.exports = {
    name: "levelmodule", 
    aliases: ["xpmodule"],
    description: "Turn level/xp module on/off.",
    category: "admins",
    usage: "<on/off>",
    run: async(client, message, args) => {
        if(!args[0]) return message.reply("You want to turn this module on/off? Please be specific!").then(m => m.delete(5000));
        if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("You do not have permission to turn module on/off.\nPermission required : `MANAGE_SERVER`").then(m => m.delete(5000));
        if(!((args[0] === "on") || (args[0] === "off"))) return message.reply(":x: Incorrect input!\nType on/off").then(m => m.delete(5000));
        Module.findOne({
            guildID: message.guild.id
        }, async(err, server) => {
            if(err) console.log(err);
            server.levelModule = args[0]
            await server.save().catch(e => console.log(e))
            if(args[0] === "off") {
                message.channel.send(`Successfully turned Level Module **${args[0]}**!\nNow, no one will gain xp.`)
            } else if(args[0] === "on") {
                message.channel.send(`Successfully turned Level Module **${args[0]}**!\nNow, everyonw will be able to gain xp.`)
            }
        })
    }
}