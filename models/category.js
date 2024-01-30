// category.js
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryimage: {
        type: String,
        required: true
    },
    wallpapers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallpaper'
    }]
});

module.exports = mongoose.model('Category', categorySchema);
