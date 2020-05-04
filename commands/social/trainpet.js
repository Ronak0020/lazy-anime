const Discord = require('discord.js')
const Pet = require("../../modules/pets.js")
const petUtil = require("../../utils/pets.js")
const mongoose = require("mongoose");
const dbUrl = process.env.MONGODBURL;
const cooldown = new Set();
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
module.exports = {
    name: "trainpet",
    aliases: ["train"],
    description: "Train your pet to level it up",
    category: "social",
    run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
            message.channel.send("Wait `10 seconds` before using this command again. - " + message.author);
    } else {
    //this is where the actual code for the command goes
    Pet.findOne({
        ownerID: message.author.id
    }, (err, pet) => {
        if (err) console.log(err);
        if (!pet) {
            message.reply("Sorry, but you don't have a pet... Do !getpet").then(m => m.delete(5000));
        } else {
            //Gonna handle this w a util for the training part. maybe generate a wild pet? random stats based 
            //on your pet? same stats different trait? 
            let data = petUtil.petTrain(pet);
            pet.petXp = pet.petXp + data.experience;
            petUtil.checkLevelUp(pet);
            
            return message.reply("You hit " + data.damage + " and gained " + data.experience + " experience.")
        }
    });
        if(message.author.id === "625877119989186570") return;
        cooldown.add(message.author.id);
        setTimeout(() => {
          cooldown.delete(message.author.id);
        }, 10000);
    }
}
}
