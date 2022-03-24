require('dotenv').config()
const bcrypt = require('bcrypt');
// create and verify token
const jwt = require('jsonwebtoken');
const models = require('../models')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
        const user = new models.User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
            profile: 'profile.jpg',
            isAdmin: 0
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error: 'L\'utilisateur n\'a pas pu être créé !' }));
    })
    .catch(error => res.status(500).json({ error: 'Erreur interne' }));
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
        .catch(error => res.status(500).json({ error: 'Erreur serveur 1' }));
    })
    .catch(error => res.status(500).json({ error: 'Erreur serveur 2' }));
};

exports.logout = async(req, res, next) => {
    res.clearCookie("jwt");
    res.status(200).json("OUT");
};

exports.getAllUsers = async(req, res, next) => {
    models.User.findAll()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneUser = async(req, res, next) => {
    models.User.findOne({ where: { id: req.body.id } })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};

exports.updateUser = async(req, res, next) => {
	const id = req.params.id;
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(req.body.password, salt, function (err, hash) {
			const updatedUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hash,
                profile: 'profile.jpg',
                isAdmin: 0
			};
			const userId = req.body.id;

			models.User.findByPk(req.body.id)
				.then((result) => {
					if (result !== null && userId === req.body.id) {
						models.User.update(updatedUser, { where: { id: req.body.id } })
							.then((result) => {
								if (result) {
									res.status(200).json({
										message: "Profile updated successfully",
										user: updatedUser,
									});
								} else {
									res.status(403).json({
										message: "You can only update your account!",
										error: error,
									});
								}
							})
							.catch((error) => {
								res.status(500).json({
									message: "Something went wrong!",
									error: error,
								});
							});
					} else {
						res.status(400).json({
							message: "Invalid request",
						});
					}
				})
				.catch((error) => {
					res.status(500).json({
						message: "Something went wrong",
						error: error,
					});
				});
		});
	});
}

exports.deleteUser = async(req, res, next) => {
    models.User.destroy({  where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: 'Compte utilisateur supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};
