const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    description: "Mutes a member until you unmute them manually.",
    category: "moderation",
    usage: "<@user>",
    run: async(client, message, args) => {
        if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("You do not have permission to use this command!").then(m => m.delete(5000));
        const toMute = message.mentions.users.first() || message.guild.members.get(args[0]);
        if(!toMute) return message.reply("Please mention the user u want to mute!").then(m => m.delete(5000));
        const reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason provided!";
        const muterole = message.guild.roles.find(`name`, "muted");

        if(!muterole){
            try{
              muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions:[]
              })
              message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false
                });
              });
            }catch(e){
              console.log(e.stack);
            }
          }
        toMute.addRole(muterole.id);
        message.channel.send("User has been muted!")
    }
}
