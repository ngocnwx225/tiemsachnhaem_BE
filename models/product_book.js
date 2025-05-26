// models/product_book.js
const mongoose = require('mongoose');

const productBookSchema = new mongoose.Schema({
  ISBN: { type: Number, required: true, unique: true },
  bookTitle: { type: String, required: true },
  publisher: { type: String, required: true },
  author: { type: String, required: true },
  pageCount: { type: Number, required: true },
  bookWeight: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  catalogId: { type: mongoose.Schema.Types.ObjectId, ref: 'catalogs', required: true }
});

module.exports = mongoose.model('Product_books', productBookSchema);
