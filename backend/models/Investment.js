const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  plan: String,
  profit: { type: Number, default: 0 },
  status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Investment', InvestmentSchema);
