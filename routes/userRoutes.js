const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminAuth = require('../middleware/adminAuth');

router.get('/', adminAuth, userController.getAllUsers);
router.get('/:id', adminAuth, userController.getUserById);
router.put('/:id', adminAuth, userController.updateUser);
router.delete('/:id', adminAuth, userController.deleteUser);

module.exports = router; 