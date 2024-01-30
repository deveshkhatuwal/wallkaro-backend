// models/wallpaper.js
const mongoose = require('mongoose');

const wallpaperSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    default: "https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  trending : {
type : Boolean,
default : false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Reference to the Category model
    required: true,
  },
  datatime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Wallpaper', wallpaperSchema);
