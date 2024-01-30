// categoryController.js
const Category = require('../models/category');

const Wallpaper = require('../models/wallpaper');

const listCategories = async (req, res) => {
  const categories = await Category.find();
  try {
    
    const wallpapersByCategory = await Promise.all(categories.map(async (category) => {
      const wallpapers = await Wallpaper.find({ category: category._id }, 'id title imageurl datetime');
      return {
        category: category.toJSON(),
        wallpapers: wallpapers,
      };
    }));
    const populatedCategories = wallpapersByCategory.map(({ category, wallpapers }) => ({
    
      id: category._id,

      name: category.name,
  
      categoryimage : category.categoryimage,
  
      Wallpapers: wallpapers.map(wallpaper => ({
        title: wallpaper.title,
        imageurl: wallpaper.imageurl,
        datetime: wallpaper.datatime,
      }),
      ),
   
   
  }));
    // const categories = await Category.find().populate({path: 'wallpapers',
    // select: 'title imageurl',});
    res.json(populatedCategories);
  } catch (error) {
    console.error('Error in listCategories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, categoryimage } = req.body;

    if (!name || !categoryimage) {
      return res.status(400).json({ error: 'Name and categoryimage are required' });
    }

    const newCategory = new Category({
      name,
      categoryimage,
    });

    await newCategory.save();

    res.json(newCategory);
  } catch (error) {
    console.error('Error in addCategory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  listCategories,
  addCategory,
};
