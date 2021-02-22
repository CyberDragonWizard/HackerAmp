const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    title: String,
    url: String,
    description: String
})

module.exports = { Post };