// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  productQuantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  orderDate: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: String, required: true }
});

module.exports = mongoose.model('orders', orderSchema);
