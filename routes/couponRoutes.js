const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/validate/:code', couponController.validateCoupon);

// Protected routes (require authentication)
router.get('/', authMiddleware, couponController.getAllCoupons);
router.get('/:id', authMiddleware, couponController.getCouponById);
router.post('/', authMiddleware, couponController.createCoupon);
router.put('/:id', authMiddleware, couponController.updateCoupon);
router.delete('/:id', authMiddleware, couponController.deleteCoupon);
router.get('/customer/:customerId', authMiddleware, couponController.getCustomerCoupons);

module.exports = router; 