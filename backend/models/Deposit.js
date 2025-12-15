const mongoose = require("mongoose");

module.exports = mongoose.model("Deposit", new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  crypto: String,
  txid: String,
  status: { type: String, default: "pending" }
}));
