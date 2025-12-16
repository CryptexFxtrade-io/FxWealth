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
// Import Jobs Safely
// -------------------------------

// Use path.join + __dirname for absolute path
const dailyProfit = require(path.join(__dirname, 'jobs', 'dailyProfit'));

// If you have other jobs, import them similarly
// const someOtherJob = require(path.join(__dirname, 'jobs', 'someOtherJob'));

// -------------------------------
// Example Routes
// -------------------------------
app.get('/', (req, res) => {
  res.send('FxWealth Backend is running');
});

// Add your API routes here
// app.use('/api/users', require('./routes/users'));

// -------------------------------
// Start Server
// -------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // Optionally, run dailyProfit job on server start
  if (dailyProfit && typeof dailyProfit.run === 'function') {
    dailyProfit.run();
    console.log('✅ dailyProfit job executed');
  }
});
