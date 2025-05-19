const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminName: String,
  password: String
});

module.exports = mongoose.model('Admin', adminSchema, 'adminlogin');