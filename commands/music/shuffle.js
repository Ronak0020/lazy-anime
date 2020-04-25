const Discord = require("discord.js");
const MusicClient = require("la-music-core");
const musicPlayer = new MusicClient(process.env.YTKEY);

module.exports = {
  name: "shuffle",
  category: "music",
  description: "Shuffles the music in the queue.",
  run: async(client, message, args) => {
      musicPlayer.shuffle(message)
  }
}
