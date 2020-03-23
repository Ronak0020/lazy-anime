const Discord = require('discord.js');

module.exports = {
    name: 'roleinfo',
    category: "info",
    description: "Get a role info.",
    usage: "<role name | role mention>",
    run: async(client, message, args) => {
        const role = message.guild.roles.find(r => r.name === args.join(" ")) || message.mentions.roles.first();

        const embed = new Discord.RichEmbed()
        .setTitle("Role Info")
        .setAuthor(message.member.displayName, message.author.displayAvatarURL)
        .setThumbnail(message.guild.iconURL)
        .addField("Role Name:", role, true)
        .addField("Role Position:", role.calculatedPosition, true)
        .addField("Mentionable:", role.mentionable ? "True" : "False", true)
        .addField("Role Color:", role.hexColor, true)
        .addField("Role ID:", role.id, true)
        .addField("Total members with this Role:", role.members.size, true)
        message.channel.send(embed)
    }
}