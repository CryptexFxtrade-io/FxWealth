// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');
const investmentRoutes = require('./routes/investment');
const walletRoutes = require('./routes/wallet');
const adminRoutes = require('./routes/admin');

// Start cron jobs
require('./cron/profit');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'FxWealth API is running' });
});

// Connect to MongoDB
console.log('Mongo URI:', process.env.MONGO_URI); // Debug line
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch( => console.error('MongoDB connection', ));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
