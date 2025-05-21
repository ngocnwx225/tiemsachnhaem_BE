const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all admins
router.get('/', authMiddleware, adminController.getAllAdmins);

// Get admin by ID
router.get('/:id', authMiddleware, adminController.getAdminById);

// Create new admin
router.post('/', authMiddleware, adminController.createAdmin);

// Update admin
router.put('/:id', authMiddleware, adminController.updateAdmin);

// Delete admin
router.delete('/:id', authMiddleware, adminController.deleteAdmin);

module.exports = router; 