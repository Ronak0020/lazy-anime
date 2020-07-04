const {Schema, model} = require("mongoose");

const STATS = new Schema({
roleID: String,
messages: Number,
eventwins: Number,
top: String
});

module.exports = model("LAclubsStats", STATS);
