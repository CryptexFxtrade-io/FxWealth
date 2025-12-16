const express = require('express');
const auth = require('../middleware/auth');
const Wallet = require('../models/Wallet');

const router = express.Router();

router.post('/deposit', auth(), async (req, res) => {
  const wallet = await Wallet.findOneAndUpdate(
    { userId: req.user.id },
    { $inc: { balance: req.body.amount } },
    { upsert: true, new: true }
  );
  res.json(wallet);
});

router.post('/withdraw', auth(), async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.user.id });
  if (!wallet || wallet.balance < req.body.amount) {
    return res.status(400).json({ message: 'Insufficient funds' });
  }
  wallet.balance -= req.body.amount;
  await wallet.save();
  res.json(wallet);
});

module.exports = router;
