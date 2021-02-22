const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const { Post } = require('../models/post');

router.get('/', (req, res) => {
    Post.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error in Retrieving Posts' + JSON.stringify(err, undefined, 2));
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Post.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Post'); }
    });
})

router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.titles,
        url: req.body.url,
        description: req.body.description
    });
    post.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Post Save' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    const post = {
        title: req.body.title,
        url: req.body.url,
        description: req.body.description
    };
    Post.findByIdAndUpdate(req.params.id, { $set: post}, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Post'); }
    });
});

router.delete('/id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Post.findOneAndRemove(req.params.id), (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Post Save' + JSON.stringify(err, undefined, 2)); }
    }
})

module.exports = router;