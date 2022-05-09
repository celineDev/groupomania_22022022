const models = require('../models');
const jwt = require('jsonwebtoken');

// create a comment
exports.createComment = (req, res, next) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;

    models.Post.findOne({ where: { id: req.params.id } })
    .then((postFound) => {
        const comment = new models.Comment({
            UserId: userId,
            postId: postFound.id,
            comment: req.body.comment,
        })
        comment.save()
        .then(() => {
            models.Post.update({ comment: parseInt(postFound.comment) +1 }, {where: { id: comment.postId} })
            .then(() => res.status(201).json({ message: 'Commentaire ajouté'}))
            .catch(error => res.status(400).json({ error: 'Une erreur c\'est produite' }));
        })
        .catch(error => res.status(400).json({ error: 'Le commentaire n\'a pas pu être créé !' }));
    })
    .catch(error => res.status(400).json({ error }));
}

// read : array of all the comments of one post
exports.getAllComment = (req, res, next) => {
    models.Post.findOne({ where: { id: req.params.id } })
    .then((postFound) => {
        const idPost = postFound.id
        models.Comment.findAll({
            where: { postId: idPost },
            order:[['createdAt', 'DESC']],
            include: [{
                model: models.User,
                attributes: ['firstName', 'lastName', 'profile']
            }],
        })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}

// get a comment by ID
exports.getOneComment = (req, res, next) => {
    models.Comment.findOne({ where: { id: req.params.id } })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error }));
}

// update
exports.modifyComment = (req, res, next) => {
    models.Comment.findOne({ where: { id: req.params.id } })
    .then((result) => {
        const commentId = result.id
        models.Comment.update({ comment: req.body.comment }, { where: { id: commentId } })
        .then(() => res.status(200).json({ message: 'Message modifié' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}

// delete
exports.deleteComment = (req, res, next) => {
    models.Comment.findOne({ where: { id: req.params.id } })
    .then((result) => {
        const commentId = result.id
        models.Comment.destroy({ where: { id: commentId } })
        .then(() => res.status(200).json({ message: 'Message supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}
