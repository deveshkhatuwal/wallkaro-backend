// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;
const uri = "mongodb://127.0.0.1:27017/wallpaper-app"
// const uri ="mongodb+srv://devesh:devesh.1@cluster0.6lvsx80.mongodb.net/wallkaro?retryWrites=true&w=majority";
// // Connect to MongoDB
mongoose.connect(uri, );

// Import models
// const Wallpaper = require('./models/wallpaper');
// const Author = require('./models/author');
const authorRoutes = require('./routes/authorRoutes');
const wallpaperRoutes = require('./routes/wallpaperRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/auth', authRoutes);
app.use('/author', authorRoutes);
app.use('/wallpaper', wallpaperRoutes);
app.use('/category', categoryRoutes);

// API Routes
// app.get('/wallpaper/list', async (req, res) => {

//     try {
     
//       const wallpapers = await Wallpaper.find().populate({
//         path: 'author',
//         select: 'name',
//       });
//       const formattedWallpapers = wallpapers.map(wallpaper => ({
//         id: wallpaper.id,
//         title: wallpaper.title,
//         likes : 0,
//         monthstop: wallpaper.monthstop,
//         imageurl: wallpaper.imageurl,
//         authorname: wallpaper.author.name ? wallpaper.author.name : 'Unknown',
//         authorid: wallpaper.author._id,
//         date: wallpaper.datatime,
//       }));
//       res.json(formattedWallpapers);
//     } catch (error) {
//       console.error('Error in /wallpaper/list route:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
// // Add a new wallpaper
// app.post('/wallpaper/add', async (req, res) => {
//     try {
//       const { id, title, name,monthstop, imageurl } = req.body;
  
//       // if (!name || typeof name !== 'object') {
//       //   throw new Error('Author information is missing or invalid.');
//       // }
  
//       // Check if the author exists or create a new one
//       let existingAuthor = await Author.findOne({
//         'name' : name,
//       });
  
//       if (!existingAuthor) {
//         // If the author doesn't exist, create a new one
//         existingAuthor = new Author({
//           name: name,
//         });
//         await existingAuthor.save();
//       }
  
//       // Create a new wallpaper with the correct author ObjectId reference
//       const newWallpaper = new Wallpaper({
     
//         title,
//         imageurl,
//         monthstop,
//         author: existingAuthor._id, // Use the _id of the existing author
//       });
  
//       await newWallpaper.save();
  
//       res.json(newWallpaper);
//     } catch (error) {
//       console.error('Error in /wallpaper/add route:', error);
//       res.status(500).json({ error: error.message }); // Send the error message in the response
//     }
//   });

// app.put('/wallpaper/edit/', async (req, res) => {
//   console.log(req.params);
//   const { id , title} = req.body;
//     let newUpdateWallpaper = await Wallpaper.updateOne(
//       {_id : id },
//       {
//         title : title
//       }
//     )
//     res.json(newUpdateWallpaper);

//   });
// app.delete('/wallpaper/delete/', async (req, res) => {
//     console.log('deleted' +req.body);
//     const { id } = req.body;
//     let deletedwallpaper = await Wallpaper.find({_id : id});
//       let newUpdateWallpaper = await Wallpaper.deleteOne(
//         {_id : id },
   
//       );
      
//       res.json(deletedwallpaper);
  
//     });
  
// // List all wallpapers with author details
// app.get('/author/list', async (req, res) => {
//     try {
//       const authors = await Author.find();
  
//       // Populate the wallpapers for each author
//       const wallpapersByAuthor = await Promise.all(authors.map(async (author) => {
//         const wallpapers = await Wallpaper.find({ author: author._id }, 'id title  datatime imageurl');
//         return {
//           author: author.toJSON(),
//           wallpapers: wallpapers,
//         };
//       }));
//       const populatedAuthors = wallpapersByAuthor.map(({ author, wallpapers }) => ({
      
//           id: author._id,

//           name: author.name,
//           rank : author.rank,
//           profileimage : author.profileimage,
      
//           Wallpapers: wallpapers.map(wallpaper => ({
//             title: wallpaper.title,
//             imageurl: wallpaper.imageurl,
          
//             date: wallpaper.datatime,
//           }),
//           ),
       
       
//       }));
  
//       // Respond with a structure that nests 'wallpapers' inside each 'author'
//       res.json(populatedAuthors);
//     } catch (error) {
//       console.error('Error in /author/list route:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
// // Add a new author
// app.post('/author/add', async (req, res) => {
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
// });

// Catch-all route for 404 errors
app.get('*', (req, res) => {
  res.status(404).send('<h1>Page Not Found</h1>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://192.168.1.9:${PORT}`);
});
// app.listen(PORT, () => {
//   console.log(`Server is running on http://127.0.0.1:${PORT}`);
// });
