const Discord = require ("discord.js");
const mongoose = require("mongoose");
const Money = require("../../modules/money.js");
const dbUrl = process.env.MONGODBURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    name: 'balance',
    description: 'Check user\'s balance for current server.',
    aliases: [`bal`],
    category: "economy",
    usage: "[@user_mention/user_id]",
    run: async(client, message, args) => {
        let target = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    if(target.user.bot) return message.channel.send(`Seems like **${target.user.username}** is a bot.`);

    Money.findOne({
        userID: target.user.id,
        serverID: message.guild.id
    }, async (err, money) => {
        let balanceEmbed = new Discord.RichEmbed()
        .setAuthor(target.user.tag, target.user.displayAvatarURL)
        .setColor("#54a041");

        if(!money) {
            balanceEmbed.addField(`Cash`, `0 Coins`)
            balanceEmbed.addField("Bank", "0 Coins")
        } else if(money) {
            balanceEmbed.addField(`Cash`, `${money.coins.toLocaleString()} Coins`)
            balanceEmbed.addField("Bank:", `${money.bank.toLocaleString()} Coins`)
        }

        message.channel.send(balanceEmbed);
    });
    },
};
