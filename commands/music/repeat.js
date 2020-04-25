const Discord = require("discord.js");
const MusicClient = require("la-music-core");
const musicPlayer = new MusicClient(process.env.YTKEY);

module.exports = {
  name: "repeat",
  category: "music",
  description: "repeats the currently playing music.",
  run: async(client, message, args) => {
      musicPlayer.repeat(message)
  }
}
