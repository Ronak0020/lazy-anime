const mongoose = require("mongoose");

const afkSchema = mongoose.Schema({
    guildID: String,
    userID: String,
    reason: String
});

module.exports = mongoose.model("Afk", afkSchema);