// models/customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerID: { type: String, required: true, unique: true },
  UserName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  'Địa chỉ': { type: String, required: true } // vì key là tiếng Việt, dùng string literal
});

module.exports = mongoose.model('customers', customerSchema);
