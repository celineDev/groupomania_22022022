const models = require('../models');
const jwt = require('jsonwebtoken');
// import package file system (node), allow to modify/delete files
const fs = require('fs');

exports.like = (req, res, next) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    const like = {
		postId: req.params.id,
		userId: userId,
	};

	models.Post.findOne({ where: { id: req.params.id } })
    .then((postFound) => {
        if (postFound !== null) {
            models.Like.findOne({
                where: { postId: like.postId, userId: like.userId },
            })
            .then((result) => {
                if (result !== null) {
                    models.Like.destroy({
                        where: { postId: like.postId, userId: like.userId },
                    })
                    .then(() => {
                        models.Post.update({ likes: postFound.likes -1 }, {where: { id: like.postId} })
                        .then(() => res.status(200).json({ message: 'Like supprimé'}))
                        .catch(error => res.status(400).json({ error: 'Une erreur c\'est produite' }));
                    })
                    .catch(error => res.status(400).json({ error }));
                } else {
                    models.Like.create(like)
                    .then(() => {
                        models.Post.update({ likes: postFound.likes +1 }, {where: { id: like.postId} })
                        .then(() => res.status(200).json({ message: 'Like un message'}))
                        .catch(error => res.status(400).json({ error: 'Une erreur c\'est produite' }));
                    })
                    .catch(error => res.status(400).json({ error: 'Message déjà liké' }));
                }
            })
            .catch(error => res.status(400).json({ error: 'Pas de message trouvé' }));
        } else {
            res.status(400).json({ error: 'Pas de message trouvé' })
        }
    })
    .catch(error => res.status(400).json({ error }));
}

exports.likeCount = (req, res, next) => {
    models.Post.findOne({ where: {id: req.params.id} })
    .then(posts => res.status(200).json(posts.likes))
    .catch(error => res.status(400).json({ error }));
}
