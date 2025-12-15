const mongoose = require("mongoose");

module.exports = mongoose.model("Withdrawal", new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  address: String,
  status: { type: String, default: "pending" }
}));
