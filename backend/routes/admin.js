const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Investment = require('../models/Investment');

const router = express.Router();

router.get('/stats', auth(['admin']), async (req, res) => {
  const users = await User.countDocuments();
  const investments = await Investment.countDocuments();
  res.json({ users, investments });
});

module.exports = router;
