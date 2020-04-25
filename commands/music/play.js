const Discord = require("discord.js");
const MusicClient = require("la-music-core");
const musicPlayer = new MusicClient(process.env.YTKEY, { earProtections: false, volume: 100 });

module.exports = {
  name: "play",
  category: "music",
  description: "Play music in a voice channel!",
  aliases: ["p"],
  usage: "<song name or url>",
  run: async(client, message, args) => {
      const searchArray = args.join(" ");
    if(!searchArray) return message.reply("You need to provide me a song name or YT link to play.").then(m => m.delete(5000));
      musicPlayer.play(message, searchArray)
  }
}
