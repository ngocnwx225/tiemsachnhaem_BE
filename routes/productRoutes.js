const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// All routes are now public
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/search', productController.searchProducts);
router.get('/catalog/:catalogId', productController.getProductsByCatalog);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/:id/stock', productController.updateStock);

module.exports = router; 