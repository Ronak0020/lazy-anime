const Discord = require("discord.js");
const MusicClient = require("la-music-core");
const musicPlayer = new MusicClient(process.env.YTKEY);

module.exports = {
  name: "queue",
  category: "music",
  description: "Shows the queue of upcoming songs.",
  aliases: ["q"],
  run: async(client, message, args) => {
      musicPlayer.showQueue(message)
  }
}
