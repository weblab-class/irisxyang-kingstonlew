const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
  user: [{ type: Schema.Types.ObjectId, ref: "user" }],
  picture: Array,
  date: String,
  word: String,
});

// compile model from schema
module.exports = mongoose.model("post", schema);
