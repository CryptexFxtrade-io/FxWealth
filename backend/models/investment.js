const mongoose = require("mongoose");

module.exports = mongoose.model("Investment", new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  dailyRate: Number,
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  lastProfitDate: Date,
  active: { type: Boolean, default: true }
}));
