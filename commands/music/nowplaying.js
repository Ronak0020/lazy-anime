const Discord = require("discord.js");
const MusicClient = require("la-music-core");
const musicPlayer = new MusicClient(process.env.YTKEY);

module.exports = {
  name: "nowplaying",
  category: "music",
  description: "Shows the currently playing music name.",
  aliases: ["np"],
  run: async(client, message, args) => {
      musicPlayer.nowPlaying(message)
  }
}
