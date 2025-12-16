// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// -------------------------
// POST /api/auth/register
// -------------------------
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required' });

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: 'Username already exists' });

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user: { username: user.username, id: user._id } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------
// POST /api/auth/login
// -------------------------
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required' });

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: { username: user.username, id: user._id } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------
// Optional GET route for browser testing
// -------------------------
router.get('/', (req, res) => {
  res.send('Auth route is working');
});

module.exports = router;
