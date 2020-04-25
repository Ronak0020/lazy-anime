const Discord = require("discord.js");
const MusicClient = require("la-music-core");
const musicPlayer = new MusicClient(process.env.YTKEY);

module.exports = {
  name: "volume",
  category: "music",
  description: "Sets the volume for songs.",
  aliases: ["vol"],
  usage: "<volume>",
  run: async(client, message, args) => {
      var volume = args[0];
      if(!vol) return message.reply("Please provide the volume you want. It must be an integer.").then(m => m.delete(5000));
      musicPlayer.volume(message, volume)
  }
}
