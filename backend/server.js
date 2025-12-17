const express = require('express');
const path = require('path');
const app = express();

// Serve API routes first
app.use('/api/auth', require('./routes/auth'));
// ...add other API routes here

// Serve frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all to serve index.html for any unknown route (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
