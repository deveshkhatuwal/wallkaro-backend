// wallpaperController.js
const Wallpaper = require('../models/wallpaper');
const Author = require('../models/author');
const Category = require('../models/category');

const incrementPoints = async (req, res) => {
  try {
      const { imageurl ,creatorName } = req.body;

      // Find the creator by ID
      // const authorname = await Author.findOne({ username: creatorName });
      const author = await Author.findOne({ username: creatorName });
      const wallpaper = await Wallpaper.findOne({ imageurl: imageurl });
      if (!author) {
        return res.status(404).json({ message: 'Creator not found' });
    }
      if (!wallpaper) {
          return res.status(404).json({ message: 'wallpaper not found' });
      }

      const currentprofilePoints = parseInt(author.totalpoints);
      const currentPoints = parseInt(wallpaper.points);


      // Increment points
      wallpaper.points = currentPoints + 1;
      author.totalpoints = currentprofilePoints + 1;
      
      // Save the updated creator object to the database

      
    


      // Increment points
      
      // Save the updated creator object to the database
      await wallpaper.save();
      await author.save();

      res.json({ message: 'Points incremented successfully', newPoints: wallpaper.points , newTotalCreatorPoint : author.totalpoints});
  } catch (error) {
      console.error('Error incrementing points:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
const listWallpapers = async (req, res) => {
  try {
    const wallpapers = await Wallpaper.find().populate({
      path: 'author',
      select: 'username',
    });
    // .populate('category', 'name');
    // const wallpapers = await Wallpaper.find().populate({
    //   path: 'author',
    //   select: 'name',
    // });
    const formattedWallpapers = wallpapers.map(wallpaper => ({
      id: wallpaper.id,
      title: wallpaper.title,
      likes: 0,
      categoryid: wallpaper.category
      ?  wallpaper.category
      : null,
      categoryname: wallpaper.categoryname
      ?  wallpaper.categoryname
      : null,
      trending : wallpaper.trending,
      imageurl: wallpaper.imageurl,
      authorname: wallpaper.author ? wallpaper.author.username : 'Unknown',
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
    const { title, authorname, trending, categoryName, getimageurl } = req.body;
    console.log(req.body);
//     const googleDriveLink = getimageurl;
//     const fileIdMatch = googleDriveLink.match(/\/file\/d\/([^\/?]+)\//);
  
// // Check if there's a match and extract the file ID
// const fileId = fileIdMatch && fileIdMatch[1];
// const finalImageUrl = ("https://drive.usercontent.google.com/download?id="+fileId) ; 
// console.log(getimageurl);
    let existingAuthor = await Author.findOne({
      'username': authorname,
    });

    if (!existingAuthor) {
      console.log('existing user');
      existingAuthor = new Author({
        username: authorname,
      });
      await existingAuthor.save();
    }

   
    // Fetch or create the Category and get its ObjectId
    let existingCategory = await Category.findOne({ name: categoryName });
    if (!existingCategory) {
      existingCategory = new Category({
        name: categoryName,
        categoryimage: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=background-blur-clean-531880.jpg&fm=jpg" // Replace with the appropriate default image URL
      });
      await existingCategory.save();
    }

    const newWallpaper = new Wallpaper({
      title: title,
      imageurl: getimageurl,
      category: existingCategory._id, // Assign the category ID
   
      categoryname :    categoryName,
      trending,
      author: existingAuthor._id
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
  incrementPoints,
};
