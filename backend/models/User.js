const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);
