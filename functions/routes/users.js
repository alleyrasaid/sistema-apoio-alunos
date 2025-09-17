const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', usersController.signup);
router.post('/sync', authMiddleware, usersController.syncUserProfile);

module.exports = router;