const Discord = require("discord.js");
const giveaways = require("discord-giveaways");
const ms = require("ms");

module.exports = {
    name: "giveaway",
    aliases: ["gstart", "gcreate"],
    category: "giveaways",
    description: "Create giveaways for your server members!",
    usage: "<duration> <winners> <prize>",
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
        if(!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.reply('You do not have permission to start/manage a giveaway!');
            giveaways.start(message.channel, {
                time: ms(args[0]),
                prize: args.slice(2).join(" "),
                winnersCount: parseInt(args[1]),
                messages: {
                    giveaway: "🎁 **GIVEAWAY** 🎁",
                    giveawayEnded: "🎁 **GIVEAWAY ENDED** 🎁",
                    timeRemaining: "Time remaining: **{duration}**!",
                    inviteToParticipate: "React with 🎁 to participate!",
                    winMessage: "Congratulations, {winners}! You won **{prize}** :tada:!",
                    embedFooter: "Giveaways",
                    noWinner: "Giveaway cancelled, no valid participations.",
                    winners: "winner(s)",
                    endedAt: "Ended at",
                    units: {
                        seconds: "seconds",
                        minutes: "minutes",
                        hours: "hours",
                        days: "days"
                    }
                }
            }).then((gData) => {
                console.log(gData);
            });
    }
    }
