const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: String,
  postId: String,
});

// compile model from schema
module.exports = mongoose.model("like", schema);
