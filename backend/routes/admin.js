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

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
}

router.get('/users', auth, adminOnly, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.get('/withdrawals', auth, adminOnly, async (req, res) => {
  const withdrawals = await Withdrawal.find().populate('user', 'name email');
  res.json(withdrawals);
});

router.post('/withdrawals/:id/approve', auth, adminOnly, async (req, res) => {
  const w = await Withdrawal.findById(req.params.id).populate('user');
  if (!w) return res.status(404).json({ message: 'Withdrawal not found' });
  if (w.status !== 'pending') return res.status(400).json({ message: 'Already processed' });
  if (w.user.balance < w.amount) return res.status(400).json({ message: 'Insufficient balance' });
  w.user.balance -= w.amount;
  w.status = 'approved';
  await w.user.save();
  await w.save();
  res.json({ message: 'Withdrawal approved' });
});

router.post('/withdrawals/:id/reject', auth, adminOnly, async (req, res) => {
  const w = await Withdrawal.findById(req.params.id);
  if (!w) return res.status(404).json({ message: 'Withdrawal not found' });
  if (w.status !== 'pending') return res.status(400).json({ message: 'Already processed' });
  w.status = 'rejected';
  await w.save();
  res.json({ message: 'Withdrawal rejected' });
});

module.exports = router;
