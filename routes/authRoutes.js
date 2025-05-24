const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register new admin
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout
router.post('/logout', authController.logout);

module.exports = router; 