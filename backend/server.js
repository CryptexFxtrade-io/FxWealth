// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// -------------------------------
// Database Connection
// -------------------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// -------------------------------
// Safe Job Import
// -------------------------------
let dailyProfit;
try {
  dailyProfit = require(path.join(__dirname, 'jobs', 'dailyProfit'));
  console.log('✅ dailyProfit job loaded');
} catch (err) {
  console.error('❌ Could not load dailyProfit job:', err.message);
  dailyProfit = { run: () => console.log('dailyProfit job missing, skipping') };
}

// -------------------------------
// Example Routes
// -------------------------------
app.get('/', (req, res) => {
  res.send('FxWealth Backend is running');
});

// -------------------------------
// Start Server
// -------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // Run dailyProfit job if available
  if (dailyProfit && typeof dailyProfit.run === 'function') {
    try {
      dailyProfit.run();
      console.log('✅ dailyProfit job executed');
    } catch (err) {
      console.error('❌ Error running dailyProfit job:', err.message);
    }
  }
});
