// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

let dailyProfit;
try {
  dailyProfit = require(path.join(__dirname, 'jobs', 'dailyProfit'));
  console.log('✅ dailyProfit job loaded');
} catch (err) {
  console.error('❌ Could not load dailyProfit job:', err.message);
  dailyProfit = { run: () => console.log('dailyProfit job missing, skipping') };
}

app.use('/api/auth', require('./routes/auth'));
app.use('/api/investment', require('./routes/investment'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => res.send('FxWealth Backend is running'));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  if (dailyProfit && typeof dailyProfit.run === 'function') dailyProfit.run();
});
