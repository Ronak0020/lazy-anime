const Discord = require('discord.js');

module.exports = {
    name: 'nickname',
    category: "moderation",
    description: "Manage nicknames!",
    aliases: ["nn", "nick"],
    usage: "[User mention] <new nickname>",
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        const username = args.slice(1).join(" ");
        if(!message.member.hasPermission(["MANAGE_NICKNAMES"])) return message.reply("Sorry, you do not have permission to use this command!");
        member.setNickname(username)
        const nn = new Discord.RichEmbed()
        .setTitle("Nickname Set!")
        .setThumbnail(member.displayAvatarURL)
        .setTimestamp()
        .setColor("RANDOM")
        .addField("Nickname set for:", member)
        .addField("New nickname:", username || "__***Back to Normal (none)***__")
        .setFooter(message.author.username, message.author.displayAvatarURL)
        message.channel.send(nn)
    }
}