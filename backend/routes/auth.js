const express = require('express');
const router = express.Router();

// Example register route
router.post('/register', (req, res) => {
  res.send('Register endpoint works');
});

// Example login route
router.post('/login', (req, res) => {
  res.send('Login endpoint works');
});

module.exports = router;
