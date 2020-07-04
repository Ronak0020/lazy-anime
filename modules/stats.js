const {Schema, model} = require("mongoose");

const STATS = new Schema({
    roleID: String,
    messages: Number,
    eventwins: Number,
    top: String,
    blacklisted: Array
});

module.exports = model("clubstatistics", STATS);
