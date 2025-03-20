const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{type: String, required: true, unique: true, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    name: {type: String, required: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]


},{timestamps: true})

module.exports = mongoose.model('User', userSchema);
