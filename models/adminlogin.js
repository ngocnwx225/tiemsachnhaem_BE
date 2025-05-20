// models/AdminLogin.js
const mongoose = require('mongoose');

const adminLoginSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('adminlogin', adminLoginSchema);
