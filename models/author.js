const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    rank:{
        type: Number,
        // require: true
        default : 0
    },

    profileimage: {
        type: String,
        // required: true
        default : "https://image.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg"
      },
    totalpoints : {
        type: Number,
        // require: true
        default : 0
    },
    datatime: {
        type: Date,
        default: Date.now
    },
}
)

module.exports = mongoose.model('Author', authorSchema);