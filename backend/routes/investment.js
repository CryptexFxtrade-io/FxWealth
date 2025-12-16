const express = require('express');
const auth = require('../middleware/auth');
const Investment = require('../models/Investment');

const router = express.Router();

router.post('/', auth(['user']), async (req, res) => {
  const inv = await Investment.create({
    userId: req.user.id,
    amount: req.body.amount,
    plan: req.body.plan
  });
  res.json(inv);
});

router.get('/', auth(), async (req, res) => {
  const data = await Investment.find({ userId: req.user.id });
  res.json(data);
});

module.exports = router;
