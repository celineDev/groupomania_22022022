const Post = require('../models/Post');

// create a post
exports.createPost = (req, res, next) => {
};

// read : array of all the posts in the database
exports.getAllPost = (req, res, next) => {
  Post.findAll()
  .then(post => res.status(200).json(post))
  .catch(error => res.status(400).json({ error }));
};

// get a post by ID
exports.getOnePost = (req, res, next) => {
}

// update
exports.modifyPost = (req, res, next) => {
}

// delete
exports.deletePost = (req, res, next) => {
}