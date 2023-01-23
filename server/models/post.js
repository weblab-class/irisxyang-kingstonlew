const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: String,
  pictureId: String,
  date: String,
  word: String,
});

// compile model from schema
module.exports = mongoose.model("post", schema);
