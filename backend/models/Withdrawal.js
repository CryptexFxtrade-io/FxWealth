const mongoose = require('mongoose');

const WithdrawalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Withdrawal', WithdrawalSchema);
