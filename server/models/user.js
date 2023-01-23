const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  bio: String,
  googleid: String,
  picture: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
