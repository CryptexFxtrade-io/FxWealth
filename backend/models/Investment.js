const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  minAmount: { type: Number, required: true },
  maxAmount: { type: Number, required: true },
  durationDays: { type: Number, required: true },
  interestPercent: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);
