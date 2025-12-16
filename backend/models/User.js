const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  balance: { type: Number, default: 0 },
  role: { type: String, default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
