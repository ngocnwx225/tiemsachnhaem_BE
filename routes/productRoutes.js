const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/search', productController.searchProducts);
router.get('/catalog/:catalogId', productController.getProductsByCatalog);

// Protected routes (require authentication)
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);
router.post('/:id/stock', authMiddleware, productController.updateStock);

module.exports = router; 