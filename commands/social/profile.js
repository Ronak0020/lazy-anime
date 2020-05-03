const Discord = require('discord.js');
const mongoose = require('mongoose');
const Levels = require('discord-xp');
const dbURL = process.env.MONGODBURL;
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const Bprofile = require("../../modules/battleprofile");
const Pet = require("../../modules/pets");
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

                Bprofile.findOne({
                    userID: target.id,
                    serverID: message.guild.id
                }, async(err, bpro) => {
                    if(err) console.log(err);
                    if (!bpro) {
                        const newDoc = new Bprofile({
                            userID: target.id,
                            username: target.username,
                            serverID: message.guild.id,
                            wins: 0,
                            losses: 0
                        })
                        newDoc.save().catch(err => console.log(err));
                    }
                    Pet.findOne({
                        ownerID: target.id
                    }, async(err, pet) => {
                        if(err) console.log(err);
                        const member = await Levels.fetch(target.id, message.guild.id, 1000);
                        const embed = new Discord.RichEmbed()
                        .setTitle("Profile")
                        .setThumbnail(target.avatarURL)
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setFooter("Ronak's Creation")
                        .setDescription(`**User Name:** ${target.username}\n**Profile Title:** ${user.title}\n**About:** ${user.about}\n**Rep:** ${user.rep.toLocaleString()}`)
                        .addField("Economy Stats:", `**Cash:** ${money.coins.toLocaleString()}\n**Bank:** ${money.bank.toLocaleString()}`)
                        .addField("Battle Stats:", `**Battles Won:** ${bpro.wins}\n**Battles Lost:** ${bpro.losses}\n**Class:** ${bpro.class}`)
                        if(!(pet && member)) {
                                message.channel.send(embed)
                            } else if(!member) {
                        message.channel.send(embed.addField("Pet Stats:", `**Pet Name:** ${pet.petName}\n**Pet Trait:** ${pet.petTrait}\n**Pet Level:** ${pet.petLvl}`))
                        } else if(!pet) {
                            message.channel.send(embed.addField("Level Stats:", `**Server Level:** ${member.level}\n**Server XP:** ${member.xp.toLocaleString()}`))
                        } else if(member && pet) {
                                embed.addField("Level Stats:", `**Server Level:** ${member.level}\n**Server XP:** ${member.xp.toLocaleString()}`)
                                embed.addField("Pet Stats:", `**Pet Name:** ${pet.petName}\n**Pet Trait:** ${pet.petTrait}\n**Pet Level:** ${pet.petLvl}`)
                                message.channel.send(embed)
                            }
                    })
                })
            })

        })
    }
}
