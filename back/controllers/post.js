const models = require('../models');

// create a post
exports.createPost = async(req, res, next) => {
    console.log('create a post')
    const post = await Post.findOrCreate({
        where: { title: 'mon titre' },

    });
        console.log(post.title); // 'sdepold'
};

// read : array of all the posts in the database
exports.getAllPost = (req, res, next) => {
    console.log('get all posts')
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