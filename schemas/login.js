const mongoose = require('mongoose');
const { Schema } = mongoose;

const LoginSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    }
});

module.exports = mongoose.model('Login', LoginSchema);
