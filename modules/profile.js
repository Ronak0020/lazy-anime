const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    userID: String,
    petName: String,
    married: String,
    about: String,
    title: String,
    rep: Number
});

module.exports = mongoose.model("Profile", profileSchema);
