const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
    userName: { type: String, required: true  ,unique: true,},
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        data: Buffer,
        contentType: String
    },
    movies: [
        {
            id: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model('Profile', ProfileSchema);
