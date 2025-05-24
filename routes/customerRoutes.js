const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// All routes are now public
router.post('/register', customerController.register);
router.post('/login', customerController.login);
router.get('/profile', customerController.getProfile);
router.put('/profile', customerController.updateProfile);
router.get('/orders', customerController.getCustomerOrders);
router.get('/invoices', customerController.getCustomerInvoices);
router.get('/coupons', customerController.getCustomerCoupons);
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router; 