const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    url: String,
    description: String
});

module.exports = mongoose.model('post', postSchema)
