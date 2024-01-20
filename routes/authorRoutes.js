// authorRoutes.js
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Define author routes
router.get('/list', authorController.listAuthors);
router.post('/add', authorController.addAuthor);

module.exports = router;