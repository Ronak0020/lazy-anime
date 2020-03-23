const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema({
    guildID: String,
    levelModule: String,
    coinModule: String,
    prefix: String,
    logChannel: String
});

module.exports = mongoose.model("Module", moduleSchema);