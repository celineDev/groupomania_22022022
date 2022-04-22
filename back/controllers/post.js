const models = require('../models');
const jwt = require('jsonwebtoken');
// import package file system (node), allow to modify/delete files
const fs = require('fs');

// create a post
exports.createPost = async(req, res, next) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;

    models.User.findOne({ where: { id: userId } })
    .then((userFound) => {
        if (userFound) {
            const post = new models.Post({
                UserId: userFound.id,
                content: req.body.content,
                imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.imageUrl,
            })
            post.save()
            .then(() => res.status(201).json({ message: 'Post créé !' }))
            .catch(error => res.status(400).json({ error: 'Le post avec image n\'a pas pu être créé !' }));
        }
        else {
            return res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    })
};

// read : array of all the posts in the database
exports.getAllPost = (req, res, next) => {
    models.Post.findAll({
        order:[['createdAt', 'DESC']]
    })
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
    if (req.file) {
        models.Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            const newImage = post.imageUrl
            if (newImage !== null) {
                const fileName = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${fileName}`, () => {
                    const postObject = {
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    };
                    models.Post.update(postObject, { where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Post modifié !'}))
                    .catch(error => res.status(400).json({ error }));
                });
            } else {
                const post = {
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                }
                models.Post.update(post, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Post modifié !'}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
        models.Post.update({content: req.body.content}, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post modifié !'}))
        .catch(error => res.status(400).json({ error }));
    }
}

// delete post, post image and likes on post
exports.deletePost = (req, res, next) => {
    models.Post.findOne({ where: { id: req.params.id } })
    .then(post => {
        if (post) {
            const idPost = post.id
            models.Like.findOne({ where: { postId: idPost }  })
            .then((result) => {
                if (result !== null) {
                    models.Like.destroy({ where: { postId: idPost } })
                    .then(() => {
                        if (post.imageUrl != null) {
                            const filename = post.imageUrl.split('/images/')[1];
                            fs.unlink(`images/${filename}`, () => {
                                models.Post.destroy({ where: { id: req.params.id } })
                                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                                .catch(error => res.status(400).json({ error }));
                            });
                        } else {
                        models.Post.destroy({ where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                        .catch(error => res.status(400).json({ error }));
                        }
                    })
                    .catch(error => res.status(400).json({ error }));
                } else {
                    if (post.imageUrl != null) {
                        const filename = post.imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            models.Post.destroy({ where: { id: req.params.id } })
                            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                            .catch(error => res.status(400).json({ error }));
                        });
                    } else {
                    models.Post.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
                    }
                }
            })
            .catch(error => res.status(500).json({ error }));
        } else {
            return res.status(404).json({ error: 'Ce post n\'existe pas'})
        }
    })
    .catch(error => res.status(500).json({ error }));
}
