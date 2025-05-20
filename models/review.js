// models/review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  Rating: { type: Number, required: true },
  Comment: { type: String },
  BookID: { type: Number, required: true }
});

module.exports = mongoose.model('reviews', reviewSchema);
