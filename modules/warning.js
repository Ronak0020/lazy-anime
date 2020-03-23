const mongoose = require("mongoose");

const warningSchema = mongoose.Schema({
    guildID: String,
    userID: String,
    mod: String,
    reason: Array
});

module.exports = mongoose.model("Warning", warningSchema);