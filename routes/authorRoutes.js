// authorRoutes.js
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Define author routes
router.get('/list', authorController.listAuthors);
router.post('/incrementpoints', authorController.incrementPoints);
router.post('/profiledata', authorController.profileData);

router.post('/info',authorController.getUserInfoFromToken);

module.exports = router;