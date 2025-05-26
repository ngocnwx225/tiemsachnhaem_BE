// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  productQuantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  orderDate: { type: String },
  paymentMethod: { type: String },
  shippingAddress: { type: String },
  status: { type: String },
  createdAt: { type: String },
  updatedAt: { type: String },
  ISBN: { type: String }
});

module.exports = mongoose.model('orders', orderSchema);
