// wallpaperController.js
const Wallpaper = require('../models/wallpaper');
const Author = require('../models/author');
const Category = require('../models/category');

const listWallpapers = async (req, res) => {
  try {
    const wallpapers = await Wallpaper.find().populate({
      path: 'author',
      select: 'name',
    });
    // .populate('category', 'name')
    // const wallpapers = await Wallpaper.find().populate({
    //   path: 'author',
    //   select: 'name',
    // });
    const formattedWallpapers = wallpapers.map(wallpaper => ({
      id: wallpaper.id,
      title: wallpaper.title,
      likes: 0,
      category: wallpaper.category
      ?  wallpaper.category._id
      : null,
      trending : wallpaper.trending,
      imageurl: wallpaper.imageurl,
      authorname: wallpaper.author.name ? wallpaper.author.name : 'Unknown',
      authorid: wallpaper.author._id,
      date: wallpaper.datatime,
    }));
    res.json(formattedWallpapers);
  } catch (error) {
    console.error('Error in /wallpaper/list route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const trendingWallpapers = async (req, res) => {
  try {
    const wallpapers = await Wallpaper.find().populate({
      path: 'author',
      select: 'name',
    }).populate('category', 'name');
    // const wallpapers = await Wallpaper.find().populate({
    //   path: 'author',
    //   select: 'name',
    // });
    const formattedWallpapers = wallpapers.map(wallpaper => ({
      id: wallpaper.id,
      title: wallpaper.title,
      likes: 0,
      category: wallpaper.category
      ?  wallpaper.category.name
      : null,
      trending : wallpaper.trending,
      imageurl: wallpaper.imageurl,
      authorname: wallpaper.author.name ? wallpaper.author.name : 'Unknown',
      authorid: wallpaper.author._id,
      date: wallpaper.datatime,
    }));
    res.json(formattedWallpapers);
  } catch (error) {
    console.error('Error in /wallpaper/list route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// wallpaperController.js
const addWallpaper = async (req, res) => {
  let existingCategory; 
  try {
    const { title, authorname, trending, category, imageurl } = req.body;

    let existingAuthor = await Author.findOne({
      'name': authorname,
    });

    if (!existingAuthor) {
      existingAuthor = new Author({
        name: authorname,
      });
      await existingAuthor.save();
    }

   
    // Fetch or create the Category and get its ObjectId
    let existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      existingCategory = new Category({
        name: category,
        categoryimage: "default_image_url",  // Replace with the appropriate default image URL
      });
      await existingCategory.save();
    }

    const newWallpaper = new Wallpaper({
      title,
      imageurl,
      category: existingCategory._id,
      trending,
      author: existingAuthor._id,
    });

    await newWallpaper.save();

    res.json(newWallpaper);
  } catch (error) {
    console.error('Error in /wallpaper/add route:', error);
    res.status(500).json({ error: error.message });
  }
};
const editWallpaper = async (req, res) => {
  const { id,imageurl} = req.body;
  try {
    const newUpdateWallpaper = await Wallpaper.findByIdAndUpdate(id, { imageurl }, { new: true });
    res.json(newUpdateWallpaper);
  } catch (error) {
    console.error('Error in /wallpaper/edit route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteWallpaper = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedWallpaper = await Wallpaper.findOneAndDelete({ _id: id });

    if (!deletedWallpaper) {
      return res.status(404).json({ error: 'Wallpaper not found' });
    }
    res.json(deletedWallpaper);
  } catch (error) {
    console.error('Error in /wallpaper/delete route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  listWallpapers,
  addWallpaper,
  editWallpaper,
  deleteWallpaper,
};
