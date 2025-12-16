const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const Investment = require('../models/Investment');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Add investment plan
router.post('/plan', auth, adminOnly, async (req, res) => {
  try {
    const plan = new Investment(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Approve transaction
router.post('/transaction/:id/approve', auth, adminOnly, async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id).populate('user').populate('investment');
    if (!tx) return res.status(404).json({ message: 'Transaction not found' });
    tx.status = 'approved';
    tx.profit = (tx.amount * tx.investment.interestPercent) / 100;
    tx.user.balance += tx.amount + tx.profit;
    await tx.user.save();
    await tx.save();
    res.json(tx);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
