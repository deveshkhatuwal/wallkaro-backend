// models/wallpaper.js
const mongoose = require('mongoose');

const wallpaperSchema = mongoose.Schema({
  title: {
    type: String,required: true},
  imageurl: {
    type: String,unique : true,required : true},
  author: {
    type: mongoose.Schema.Types.ObjectId,ref: 'Author',required: true},
  trending : {type : Boolean,default : false},
  category: {
    type : String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Category',  // Reference to the Category model
    required : true
   
  },
  categoryname: {
    type: String,
    required: true,
  },
  points : {
    type: Number,
    // require: true
    default : 0
},
  datatime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Wallpaper', wallpaperSchema);
