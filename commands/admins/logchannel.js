const Discord = require('discord.js');
const mongoose = require('mongoose')
const dbURL = 'mongodb://heroku_85nc06pf:t03p8l1j1smlo9ct6fi5bovp02@ds259738.mlab.com:59738/heroku_85nc06pf';
mongoose.connect(dbURL, {
    useNewUrlParser: true
})
const Module = require('../../modules/module');

module.exports = {
    name: 'logchannel',
    aliases: ["logchannel", "logs", "setlogchannel"],
    description: "Set log channel for your server's ban/kick/mute notifications.",
    usage: "<channel name (without #)>",
    category: "admins",
    run: async(client, message, args) => {
        Module.findOne({
            guildID: message.guild.id
        }, async(err, server) => {
            if(err) console.log(err);
            if(!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.reply("Sorry, you do not have permission to use this command.\n Permission Required: `MANAGE_CHANNELS`").then(m => m.delete(5000));
            const channel = args[0];
            if(!channel) message.reply("Please tell me the name of channel u want to set as LogChannel.").then(m => m.delete(10000));
            if(channel.startsWith('#')) return message.reply("Please dont mention the channel and dont include `#` in the name.").then(m => m.delete(5000));

            server.logChannel = channel;
            await server.save().catch(e => console.log(e));
            message.channel.send("Successfully set `" + channel + "` as LogChannel!")
        })
    }
}