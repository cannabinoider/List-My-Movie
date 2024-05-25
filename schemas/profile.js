const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for Profile
const ProfileSchema = new Schema({
    userName: { type: String, required: true  ,unique: true,},
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
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
