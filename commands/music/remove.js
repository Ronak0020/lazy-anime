const Discord = require("discord.js");
const MusicClient = require("la-music-core");
const musicPlayer = new MusicClient(process.env.YTKEY);

module.exports = {
  name: "remove",
  category: "music",
  description: "removes the music from the queue.",
  run: async(client, message, args) => {
      musicPlayer.remove(message)
  }
}
