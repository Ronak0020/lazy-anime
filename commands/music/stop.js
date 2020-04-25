const Discord = require("discord.js");
const MusicClient = require("la-music-core");
const musicPlayer = new MusicClient(process.env.YTKEY);

module.exports = {
  name: "stop",
  category: "music",
  description: "Stop music playing in a voice channel and clear the queue.",
  run: async(client, message, args) => {
      musicPlayer.stop(message)
  }
}
