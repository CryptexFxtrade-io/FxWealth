const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  amount: { type: Number, required: true },
  plan: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Investment', InvestmentSchema);
