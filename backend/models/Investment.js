const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  profit: { type: Number, default: 0 },
  status: { type: String, default: 'active' }
});

module.exports = mongoose.model('Investment', InvestmentSchema);
