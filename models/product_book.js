// models/product_book.js
const mongoose = require('mongoose');

const productBookSchema = new mongoose.Schema({
  ISBN: { type: Number, required: true, unique: true },
  BookTitle: { type: String, required: true },
  Publisher: { type: String, required: true },
  Author: { type: String, required: true },
  PageCount: { type: Number, required: true },
  BookWeight: { type: String, required: true },
  Price: { type: Number, required: true },
  Description: { type: String },
  Catalog: { type: String, required: true }
});

module.exports = mongoose.model('product_books', productBookSchema);
