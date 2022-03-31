const models = require('../models');
const jwt = require('jsonwebtoken');

// create a post
exports.createPost = async(req, res, next) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;

    models.User.findOne({ where: { id: userId } })
    .then((userFound) => {
        if (userFound) {
            if (req.file) {
                const post = new models.Post({
                    content: req.body.content,
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    likes: req.body.likes,
                    comment: req.body.comment,
                    UserId: userFound.id,
                })
                post.save()
                .then(() => res.status(201).json({ message: 'Post créé !' }))
                .catch(error => res.status(400).json({ error: 'Le post avec image n\'a pas pu être créé !' }));
            }
            else {
                const post = new models.Post({
                    UserId: userFound.id,
                    content: req.body.content,
                })
                console.log(post)
                post.save()
                .then(() => res.status(201).json({ message: 'Post créé !' }))
                .catch(error => res.status(400).json({ error }));
            }
        }
        else {
            return res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    })
};

// read : array of all the posts in the database
exports.getAllPost = (req, res, next) => {
    models.Post.findAll({})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

// get a post by ID
exports.getOnePost = (req, res, next) => {
    models.Post.findOne({ where: { id: req.params.id } })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}

// update
exports.modifyPost = (req, res, next) => {
}

// delete
exports.deletePost = (req, res, next) => {
}