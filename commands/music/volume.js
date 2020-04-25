const Discord = require("discord.js");
const MusicClient = require("la-music-core");
const musicPlayer = new MusicClient(process.env.YTKEY);

module.exports = {
  name: "volume",
  category: "music",
  description: "Sets the volume for songs.",
  aliases: ["vol"],
  run: async(client, message, args) => {
      const vol = args[0];
      if(!vol) return message.reply("Please provide the volume you want. It must be an integer.").then(m => m.delete(5000));
      if(isNaN(vol)) return message.reply("The provided volume is not an integer!");
      musicPlayer.volume(message, vol)
  }
}
