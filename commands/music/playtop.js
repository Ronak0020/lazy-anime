const Discord = require("discord.js");
const MusicClient = require("la-music-core");
const musicPlayer = new MusicClient(process.env.YTKEY);

module.exports = {
  name: "playtop",
  aliases: ["playt", "pt"],
  category: "music",
  description: "repeats the currently playing music.",
  run: async(client, message, args) => {
      const searchArray = args.join(" ");
      if(!searchArray) return message.reply("You need to provide music name or url to play.").then(m => m.delete(5000));
      musicPlayer.playTop(message, searchArray)
  }
}
