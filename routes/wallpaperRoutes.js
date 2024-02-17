// wallpaperRoutes.js
const express = require('express');
const router = express.Router();
const wallpaperController = require('../controllers/wallpaperController');

// Define wallpaper routes
router.get('/list', wallpaperController.listWallpapers);
router.post('/add', wallpaperController.addWallpaper);
router.post('/incrementpoints', wallpaperController.incrementPoints);
router.put('/edit', wallpaperController.editWallpaper);
router.delete('/delete', wallpaperController.deleteWallpaper);


module.exports = router;
