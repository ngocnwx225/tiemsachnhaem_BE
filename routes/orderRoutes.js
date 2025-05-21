const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all orders
router.get('/', authMiddleware, orderController.getAllOrders);

// Get order by ID
router.get('/:id', authMiddleware, orderController.getOrderById);

// Create new order
router.post('/', authMiddleware, orderController.createOrder);

// Update order
router.put('/:id', authMiddleware, orderController.updateOrder);

// Delete order
router.delete('/:id', authMiddleware, orderController.deleteOrder);

module.exports = router; 