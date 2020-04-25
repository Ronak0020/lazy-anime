const Discord = require("discord.js");
const MusicClient = require("la-music-core");
const musicPlayer = new MusicClient(process.env.YTKEY);

module.exports = {
  name: "skip",
  category: "music",
  description: "Skips the currently playing music.",
  run: async(client, message, args) => {
      musicPlayer.skip(message)
  }
}
