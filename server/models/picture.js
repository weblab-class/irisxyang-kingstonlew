const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userId: String,
    pixels: Array,
});

// compile model from schema
module.exports = mongoose.model("post", schema);
