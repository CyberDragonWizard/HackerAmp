const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');
const Schema = require("../models/post");

mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGO_URI || process.env.MONGO_LOCAL, { useUnifiedTopology: true, useNewUrlParser: true }, function(err) {
    if(err) console.log('Connection Error');
});

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