const Discord = require("discord.js");
const MusicClient = require("discord-music-core");
const musicPlayer = new MusicClient("AIzaSyBmJU3L-CnuIZImSJSBosDyvy_3nblsW9U");

module.exports = {
  name: "play",
  run: async(client, message, args) => {
      musicPlayer.play(message, searchArray)
  }
}
