const Discord = require('discord.js')
const Pet = require("../../modules/pets.js")
const petUtil = require("../../utils/pets.js")
const mongoose = require("mongoose");
const dbUrl = "mongodb://heroku_85nc06pf:t03p8l1j1smlo9ct6fi5bovp02@ds259738.mlab.com:59738/heroku_85nc06pf";
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
module.exports = {
    name: "trainpet",
    run: async (client, message, args) => {
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
}
}
