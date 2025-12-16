const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  investment: { type: mongoose.Schema.Types.ObjectId, ref: 'Investment', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  profit: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
