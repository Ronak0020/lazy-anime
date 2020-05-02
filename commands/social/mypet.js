const Discord = require('discord.js');
const Pet = require("../../modules/pets.js");
const mongoose = require("mongoose");
const dbUrl = process.env.MONGODBURL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
module.exports = {
    name: "mypet",
    category: "social",
    description: "check your pet stats.",
    aliases: ["petinfo"],
run: async (bot, message, args) => {
    //this is where the actual code for the command goes
    Pet.findOne({
        ownerID: message.author.id
    }, (err, res) => {
        let embed = new Discord.RichEmbed()
        .setTitle("My Pet!")
        .setThumbnail(message.author.displayAvatarURL)

        if(!res){
            embed.setColor("RED")
            embed.addField("Sorry!", "You don't have a pet... Please type !getpet.")
        }else{
            embed.setColor("BLURPLE");
            embed.addField("Pet Name", res.petName);
            embed.addField("Pet Level", "Level: " + res.petLvl + ".");
            embed.addField("Pet XP", "XP: " + res.petXp);
        }
        message.channel.send(embed);
    })
}
}
