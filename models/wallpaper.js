// models/wallpaper.js
const mongoose = require('mongoose');

const wallpaperSchema = mongoose.Schema({
//   id: {
//     type: Number,
//     unique: true,
//     required: true
//   },
  title: {
    type: String,
    required: true
  },
  monthstop: {
    type: Boolean,
    default: false
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    // required: true
    // required: true
  },
  imageurl: {
    type: String,
    required: true
    // default : "https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  authorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authorid',
   
  },
  datatime: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Wallpaper', wallpaperSchema);
