const express = require('express');
const router = express.Router();
const userLogController = require('../controllers/userLogController');

router.get('/', userLogController.getAllUserLogs);
router.get('/:id', userLogController.getUserLogById);
router.post('/', userLogController.createUserLog);
router.put('/:id', userLogController.updateUserLog);
router.delete('/:id', userLogController.deleteUserLog);

module.exports = router; 