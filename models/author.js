const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    rank:{
        type: Number,
        require: true
    },
    profileimage: {
        type: String,
        required: true
        // default : "https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
    datatime: {
        type: Date,
        default: Date.now
    },
}
)

module.exports = mongoose.model('Author', authorSchema);