const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/register', customerController.register);
router.post('/login', customerController.login);

// Protected routes
router.get('/profile', authMiddleware, customerController.getProfile);
router.put('/profile', authMiddleware, customerController.updateProfile);
router.get('/orders', authMiddleware, customerController.getCustomerOrders);
router.get('/invoices', authMiddleware, customerController.getCustomerInvoices);
router.get('/coupons', authMiddleware, customerController.getCustomerCoupons);

// Admin only routes
router.get('/', authMiddleware, customerController.getAllCustomers);
router.get('/:id', authMiddleware, customerController.getCustomerById);
router.delete('/:id', authMiddleware, customerController.deleteCustomer);

module.exports = router; 