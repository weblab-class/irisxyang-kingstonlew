const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
  user: Schema.Types.ObjectId,
  picture: Array,
  date: String,
  word: String,
});

// compile model from schema
module.exports = mongoose.model("post", schema);
