// authorController.js
const Author = require('../models/author');
const Wallpaper = require('../models/wallpaper');
const jwt = require("jsonwebtoken");
const getUserInfoFromToken = async (req, res) => {
  
  try {
    const { token } = req.body;
    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, 'secret');

    // The decodedToken now contains user information
    const { username, userId } = decodedToken;

    res.json(decodedToken);
  } catch (error) {
    // Handle token verification errors
    console.error('Error verifying token:', error);
    return null; // Return null if there's an error
  }
};

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

        username: author.username,
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
const incrementPoints = async (req, res) => {
  try {
      const { creatorName } = req.body;

      // Find the creator by ID
      const author = await Author.findOne({ username: creatorName });

      if (!author) {
          return res.status(404).json({ message: 'Creator not found' });
      }

      const currentPoints = parseInt(author.totalpoints);
    


      // Increment points
      author.totalpoints = currentPoints + 1;
      // Save the updated creator object to the database
      await author.save();

      res.json({ message: 'Points incremented successfully', newPoints: author.totalpoints });
  } catch (error) {
      console.error('Error incrementing points:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const profileData = async(req, res) => { 
  try {

    const { username } = req.body;
    const authors = await Author.find({username : username});

    // Populate the wallpapers for each author
    const wallpapersByAuthor = await Promise.all(authors.map(async (author) => {
      const wallpapers = await Wallpaper.find({ author: author._id }, 'id title  datatime imageurl points');
      return {
        author: author.toJSON(),
        wallpapers: wallpapers,
      };
    }));
    const populatedAuthors = wallpapersByAuthor.map(({ author, wallpapers }) => ({
        id: author._id,
        username: author.username,
        profileimage : author.profileimage,
        totalpoints : author.totalpoints,
        Wallpapers: wallpapers.map(wallpaper => ({
          points : wallpaper.points,
          id : wallpaper.id,
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
// const addAuthor =async (req, res) => {
//   try {
//     const { name , rank , profileimage} = req.body;

//     const newAuthor = new Author({
//       name: name,
//       rank : rank,
//       profileimage : profileimage
//     });

//     await newAuthor.save();

//     res.json(newAuthor);
//   } catch (error) {
//     console.error('Error in /author/add route:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
module.exports = {
  listAuthors,
  profileData,
  getUserInfoFromToken,
  incrementPoints,
  // addAuthor,
};
