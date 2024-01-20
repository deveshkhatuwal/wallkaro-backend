// authorController.js
const Author = require('../models/author');
const Wallpaper = require('../models/wallpaper');

const listAuthors = async(req, res) => {
  try {
    const authors = await Author.find();

    // Populate the wallpapers for each author
    const wallpapersByAuthor = await Promise.all(authors.map(async (author) => {
      const wallpapers = await Wallpaper.find({ author: author._id }, 'id title  datatime imageurl');
      return {
        author: author.toJSON(),
        wallpapers: wallpapers,
      };
    }));
    const populatedAuthors = wallpapersByAuthor.map(({ author, wallpapers }) => ({
    
        id: author._id,

        name: author.name,
        rank : author.rank,
        profileimage : author.profileimage,
    
        Wallpapers: wallpapers.map(wallpaper => ({
          title: wallpaper.title,
          imageurl: wallpaper.imageurl,
        
          date: wallpaper.datatime,
        }),
        ),
     
     
    }));

    // Respond with a structure that nests 'wallpapers' inside each 'author'
    res.json(populatedAuthors);
  } catch (error) {
    console.error('Error in /author/list route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addAuthor =async (req, res) => {
  try {
    const authors = await Author.find();

    // Populate the wallpapers for each author
    const wallpapersByAuthor = await Promise.all(authors.map(async (author) => {
      const wallpapers = await Wallpaper.find({ author: author._id }, 'id title  datatime imageurl');
      return {
        author: author.toJSON(),
        wallpapers: wallpapers,
      };
    }));
    const populatedAuthors = wallpapersByAuthor.map(({ author, wallpapers }) => ({
    
        id: author._id,

        name: author.name,
        rank : author.rank,
        profileimage : author.profileimage,
    
        Wallpapers: wallpapers.map(wallpaper => ({
          title: wallpaper.title,
          imageurl: wallpaper.imageurl,
        
          date: wallpaper.datatime,
        }),
        ),
     
     
    }));

    // Respond with a structure that nests 'wallpapers' inside each 'author'
    res.json(populatedAuthors);
  } catch (error) {
    console.error('Error in /author/list route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
  listAuthors,
  addAuthor,
};
