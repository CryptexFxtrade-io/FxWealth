const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  balance: { type: Number, default: 0 },
  role: { type: String, default: "user" },
  blocked: { type: Boolean, default: false }
}));
