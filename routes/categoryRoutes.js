// authorRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Define author routes
router.get('/list', categoryController.listCategories);
router.post('/add', categoryController.addCategory);

module.exports = router;