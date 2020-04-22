const Discord = require('discord.js');
const mongoose = require('mongoose');
const Levels = require('discord-xp');
const dbURL = process.env.MONGODBURL;
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const Profile = require('../../modules/profile');
const Money = require('../../modules/money');

module.exports = {
    name: "profile",
    category: "social",
    usage: "[@user]",
    description: "Check a user's profile.",
    run: async(client, message, args) => {
        const target = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author;
        Profile.findOne({
            userID: target.id
        }, async(err, user) => {
            if(err) console.log(err);
            if(!user) {
                const newProfile = new Profile({
                    userID: target.id,
                    about: "Just a normal human",
                    petName: "",
                    married: "",
                    title: "LA member",
                    rep: "0"
                })
                await newProfile.save().catch(e => console.log(e))
            }
            Money.findOne({
                userID: target.id,
                serverID: message.guild.id,
            }, async(err, money) => {
                if(err) console.log(err);
                const member = await Levels.fetch(target.id, message.guild.id, 1000);
                const embed = new Discord.RichEmbed()
                .setTitle("Profile")
                .setThumbnail(target.avatarURL)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter("Ronak#0020's Creation")
                .setDescription(`**User Name:** ${target.username}\n**Profile Title:** ${user.title}\n**About:** ${user.about}\n**Rep:** ${user.rep.toLocaleString()}\n**Pet Name:** ${user.petName}\n**Married With:** ${user.married}\n**Server Level:** ${member.level}\n**Server XP:** ${member.xp.toLocaleString()}\n**Cash:** ${money.coins.toLocaleString()}\n**Bank:** ${money.bank.toLocaleString()}`)
                message.channel.send(embed)
            })

        })
    }
}
