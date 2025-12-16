const mongoose = require("mongoose");

module.exports = mongoose.model("Transaction", new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  type: String,
  amount: Number,
  date: { type: Date, default: Date.now }
}));
