const express = require('express');
const router = express.Router();
const Investment = require('../models/Investment');

// Example: Get all investments
router.get('/', async (req, res) => {
  try {
    const investments = await Investment.find();
    res.json(investments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
