const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');
const Schema = require("../models/post");
const dotenv = require("dotenv")

dotenv.config()


let db2 = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@hackeramp.niw0d.mongodb.net/test`;
const db = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@hackeramp.niw0d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose.connect( db || db2, { useUnifiedTopology: true, useNewUrlParser: true }, function(err) {
    if(err) console.log('Connection Error');
});

if (process.env.NODE_ENV === 'production') {
    applicationCache.use(express.static('../../dist/hackeramp'))
}

router.get('/posts', function(req, res) {
    console.log('Requesting posts');
    post.find({}).exec(function(err, posts) {
        if(err) console.log('Error getting posts.');
        else {
            res.json(posts);
        }
    });
    
});

router.get('/details/:id', function(req, res) {
    console.log('Requesting post');
    post.findById(req.params.id).exec(function(err, post) {
        if(err) console.log('Error getting post.');
        else {
            res.json(post);
        }
    });
    
});

router.delete("/details/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Schema.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).send("Request deleted, democracy subverted");
        }
        throw new Error("Request not found, sorry Putin");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/posts', function(req, res) {
    console.log('Posting a post');
    const newPost = new post();
    newPost.title = req.body.title;
    newPost.url = req.body.url;
    newPost.description = req.body.description;
    newPost.save(function(err, addedPost) {
        if (err) console.log('Error inserting post.');
        else res.json(addedPost);
    })
    
});

module.exports = router;