const Discord = require('discord.js');

module.exports = {
name: 'eval',
category: 'owner',
description: "Only bot owner can use it! Don't even dare to try it!",
usage: "<code>",
run: async(client, message, args) => {
if(message.author.id !== "625877119989186570") return message.channel.send("Only bot owner can use this command")
    try {
      var code = args.join(" ");
      if (code === "client.token") return message.channel.send("Dont wanna do that 0_0")
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      
      const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .addField(":inbox_tray: Input: ", `\`\`\`${code}\`\`\``)
        .addField(":outbox_tray: output: ", `\`\`\`js\n${clean(evaled)}\n\`\`\``)
      message.channel.send({embed})
    } catch (err) {
      const embed = new Discord.RichEmbed()
      .setColor(0x00A2E8)
      .addField(":inbox_tray: Input: ", `\`\`\`${code}\`\`\``)
      .addField(":outbox_tray: output: ", `\`\`\`${clean(err)}\`\`\``)
    message.channel.send({embed})
    }

function clean(text) {
  if (typeof(text) === 'string')
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  else
      return text;
  }
}
}
