const Discord = require("discord.js");
const Stat = require("../../modules/stats.js");

module.exports = {
name: "blacklist",
aliases: ["bl", "black"],
category: "owner",
run: async(client, message, args) => {
if(message.author.id !== "625877119989186570") return;
const channel = message.mentions.channels.first();

let roleid = "";
    const club1 = message.guild.roles.find(r => r.id === "728979973230166196");
    const club2 = message.guild.roles.find(r => r.id === "728980035226173511");
    const club3 = message.guild.roles.find(r => r.id === "728980062908448818");
    const club4 = message.guild.roles.find(r => r.id === "728980098790981652");
    const club5 = message.guild.roles.find(r => r.id === "728980122618822738");
    if(!message.member.roles.has(club1.id) && !message.member.roles.has(club2.id) && !message.member.roles.has(club3.id) && !message.member.roles.has(club4.id) && !message.member.roles.has(club5.id)) return;
    roleid = club1.id;
    if(message.member.roles.has(club1.id)) {
        roleid = club1.id;
    } else
    if(message.member.roles.has(club2.id)) {
        roleid = club2.id;
    } else
    if(message.member.roles.has(club3.id)) {
        roleid = club3.id;
    } else
    if(message.member.roles.has(club4.id)) {
        roleid = club4.id;
    } else
    if(message.member.roles.has(club5.id)) {
        roleid = club5.id;
    }

Stat.findOne({
roleID: roleid
}, async(err, stat) => {
if(err) console.log(err);
stat.blacklisted.push(channel.id);
await stat.save().catch(e => console.log(e));
message.reply("Done! Added the channel in Blacklisted channel list!");
})
}
}
