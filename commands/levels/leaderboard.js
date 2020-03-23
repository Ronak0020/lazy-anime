const Discord = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    name: 'leaderboard',
    category: 'levels',
    description: "Check out whgo is at highest rank in the server!",
    aliases: ["rlb", "levellb"],
    run: async(client, message, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5); // We grab top 10 users with most xp in the current server.
 
if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
 
const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard); // We process the leaderboard.
 
const lb = leaderboard.map(e => `**${e.position}.** **${e.username}#${e.discriminator}**\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);
 const rlb = new Discord.RichEmbed()
 .setTitle('LEADERBOARD:')
 .setDescription(`${lb.join("\n\n")}`)
 .setColor('RANDOM')
 .setFooter(client.user.username, client.user.displayAvatarURL)
 .setTimestamp()
message.channel.send(rlb);
    }
}