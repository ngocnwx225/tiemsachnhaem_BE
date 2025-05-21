const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all catalogs
router.get('/', catalogController.getAllCatalogs);

// Get catalog by ID
router.get('/:id', catalogController.getCatalogById);

// Create new catalog
router.post('/', authMiddleware, catalogController.createCatalog);

// Update catalog
router.put('/:id', authMiddleware, catalogController.updateCatalog);

// Delete catalog
router.delete('/:id', authMiddleware, catalogController.deleteCatalog);

module.exports = router; 