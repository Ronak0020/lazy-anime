const Discord = require("discord.js");
const MusicClient = require("la-music-core");
const musicPlayer = new MusicClient(process.env.YTKEY);

module.exports = {
  name: "loop",
  category: "music",
  description: "Loops the music queue.",
  run: async(client, message, args) => {
      musicPlayer.loop(message)
  }
}
