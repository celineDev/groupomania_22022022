require('dotenv').config()
const bcrypt = require('bcrypt');
// create and verify token
const jwt = require('jsonwebtoken');
const models = require('../models')
// import package file system (node), allow to modify/delete files
const fs = require('fs');

exports.signup = (req, res, next) => {
    models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
        if (user) {
            return res.status(400).json({ error: 'Cet email existe déjà' });
        }
        else {
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
            const user = new models.User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                profile: `${req.protocol}://${req.get('host')}/images/default/profile.png`,
                isAdmin: 0
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error: 'L\'utilisateur n\'a pas pu être créé !' }));
        })
        .catch(error => res.status(500).json({ error: 'Erreur interne' }));
        }
    })
    .catch(error => res.status(500).json({ error: 'Erreur serveur' }));
};

exports.login = async(req, res, next) => {
    models.User.findOne({ where: { email: req.body.email } })
        .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            const maxAge = 1 * 24 * 60 * 60 * 1000
            const token = jwt.sign({ userId: user.id}, process.env.JWT_TOKEN, { expiresIn: maxAge })
            // sameSite: true,
            // secure: true,
            res.cookie('jwt', token, { httpOnly: true, maxAge} )
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    process.env.JWT_TOKEN,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error: 'Erreur serveur' }));
    })
    .catch(error => res.status(500).json({ error: 'Erreur serveur' }));
};

exports.logout = async(req, res, next) => {
    res.clearCookie("jwt");
    res.status(200).json("User logged out");
};

exports.getAllUsers = async(req, res, next) => {
    models.User.findAll()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneUser = async(req, res, next) => {
    models.User.findOne({ where: { id: req.params.id } })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
}

exports.updateUser = (req, res, next) => {
    if (req.file) {
        models.User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            const fileName = user.profile.split('/images/')[1];
            // keep defaut profile picture
            if (fileName !== "default/profile.png") {
                fs.unlink(`images/${fileName}`, () => {
                    const userObject = {
                        profile: `${req.protocol}://${req.get('host')}/images/${
                        req.file.filename
                        }`,
                    }
                    models.User.update(userObject, { where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
                    .catch(error => res.status(400).json({ error }));
                });
            } else {
                const user = {
                    profile: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                models.User.update(user, { where: { id: req.params.id } })
                    .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
                    .catch(error => res.status(400).json({ error: 'L\'utilisateur n\'a pas pu être modifié !' }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
        models.User.update({ firstName: req.body.firstName, lastName: req.body.lastName}, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
        .catch(error => res.status(400).json({ error }));
    }
}

exports.deleteUser = async(req, res, next) => {
    models.User.findOne({ id: req.params.id })
    .then(user => {
        const filename = user.profile.split('/images/')[1];
        if (filename !== "default/profile.png") {
            fs.unlink(`images/${filename}`, () => {
            models.User.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Compte utilisateur supprimé !'}))
            .catch(error => res.status(400).json({ error }));
            });
        } else {
            models.User.destroy({  where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Compte utilisateur supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
};
