// models/user_log.js
const mongoose = require('mongoose');

const userLogSchema = new mongoose.Schema({
  UserName: { type: String, required: true },
  Password: { type: String, required: true }
});

module.exports = mongoose.model('user_logs', userLogSchema);
