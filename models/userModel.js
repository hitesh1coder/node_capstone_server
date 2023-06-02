const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  email: String,
  mobile: Number,
  password: String,
  terms: Boolean,
});
module.exports = User;
