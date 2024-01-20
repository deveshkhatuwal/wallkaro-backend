// wallpaperController.js
const Wallpaper = require('../models/wallpaper');

const listWallpapers = async(req, res) => {
  try {
     
    const wallpapers = await Wallpaper.find().populate({
      path: 'author',
      select: 'name',
    });
    const formattedWallpapers = wallpapers.map(wallpaper => ({
      id: wallpaper.id,
      title: wallpaper.title,
      likes : 0,
      monthstop: wallpaper.monthstop,
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

const addWallpaper = async (req, res) => {
  try {
    const { id, title, name,monthstop, imageurl } = req.body;

    // if (!name || typeof name !== 'object') {
    //   throw new Error('Author information is missing or invalid.');
    // }

    // Check if the author exists or create a new one
    let existingAuthor = await Author.findOne({
      'name' : name,
    });

    if (!existingAuthor) {
      // If the author doesn't exist, create a new one
      existingAuthor = new Author({
        name: name,
      });
      await existingAuthor.save();
    }

    // Create a new wallpaper with the correct author ObjectId reference
    const newWallpaper = new Wallpaper({
   
      title,
      imageurl,
      monthstop,
      author: existingAuthor._id, // Use the _id of the existing author
    });

    await newWallpaper.save();

    res.json(newWallpaper);
  } catch (error) {
    console.error('Error in /wallpaper/add route:', error);
    res.status(500).json({ error: error.message }); // Send the error message in the response
  }
};

const editWallpaper = async (req, res) => {
  console.log(req.params);
  const { id , title} = req.body;
    let newUpdateWallpaper = await Wallpaper.updateOne(
      {_id : id },
      {
        title : title
      }
    )
    res.json(newUpdateWallpaper);
};
const deleteWallpaper = async (req, res) => {
  console.log('deleted' +req.body);
  const { id } = req.body;
  let deletedwallpaper = await Wallpaper.find({_id : id});
    let newUpdateWallpaper = await Wallpaper.deleteOne(
      {_id : id },
 
    );
    
    res.json(deletedwallpaper);

  };
module.exports = {
  listWallpapers,
  addWallpaper,
  editWallpaper,
  deleteWallpaper,
};
