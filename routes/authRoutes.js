const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define author routes
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;