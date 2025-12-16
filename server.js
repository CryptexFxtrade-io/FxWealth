// server.js
const express = require('express');
mongoose.connect(process.env.MONGO_URI);
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Import your routes
const authRoutes = require('./routes/auth');
const investmentRoutes = require('./routes/investment'); // if you have this

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes); // optional

// Root route (fix Cannot GET /)
app.get('/', (req, res) => {
  res.send('FxWealth backend is running!');
});

// Serve frontend if you have a React build (optional)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
