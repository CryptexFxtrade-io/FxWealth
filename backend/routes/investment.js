const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Withdrawal = require('../models/Withdrawal');

const router = express.Router();

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

router.post('/create', auth, async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.balance += Number(amount);
  await user.save();
  res.json({ message: 'Investment added', balance: user.balance });
});

router.get('/balance', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ balance: user.balance });
});

router.post('/withdraw', auth, async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (amount > user.balance) return res.status(400).json({ message: 'Insufficient balance' });
  const withdrawal = await Withdrawal.create({ user: user._id, amount });
  res.json({ message: 'Withdrawal requested', withdrawal });
});

module.exports = router;
