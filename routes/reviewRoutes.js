const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all reviews
router.get('/', reviewController.getAllReviews);

// Get review by ID
router.get('/:id', reviewController.getReviewById);

// Create new review
router.post('/', authMiddleware, reviewController.createReview);

// Update review
router.put('/:id', authMiddleware, reviewController.updateReview);

// Delete review
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router; 