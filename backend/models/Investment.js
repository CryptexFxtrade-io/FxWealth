// backend/routes/investment.js
const express = require('express');
const router = express.Router();

// Example investment route
router.get('/', (req, res) => {
  res.send('Investment route works');
});

module.exports = router;
