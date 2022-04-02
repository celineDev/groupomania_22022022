require('dotenv').config()
const bcrypt = require('bcrypt');
// create and verify token
const jwt = require('jsonwebtoken');
const models = require('../models')
// import package file system (node), allow to modify/delete files
const fs = require('fs');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
        const user = new models.User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            profile: 'profile.jpg',
            isAdmin: 0
        });
        console.log(user)
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

// ------------------------------------
// exports.updateUser = async(req, res, next) => {
//     console.log('hello')
//     console.log(req.file)
//     console.log(req.file)
//     console.log(req.file)
//     bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//         const userId = req.body.id;
//         if (req.file) {
//             models.User.findByPk(req.body.id)
//             .then((user) => {
//                 if (user !== null && userId === req.body.id) {

//                     // const fileName = req.body.firstName + req.body.id + ".jpg"
//                     // const path = `${__dirname}/../../front/public/images/uploads/${fileName}`
//                     // const clientPath = ``

//                     const fileName = user.imageUrl.split('/images/')[1];
//                     fs.unlink(`images/${fileName}`, () => {
//                         const updatedUser = {
//                             firstName: req.body.firstName,
//                             lastName: req.body.lastName,
//                             email: req.body.email,
//                             password: hash,
//                             profile: `${req.protocol}://${req.get('host')}/images/${
//                                 req.file.filename
//                               }`,
//                             isAdmin: 0,
//                         };
//                         models.User.update(updatedUser, { where: { id: req.body.id } })
//                         .then((user) => {
//                             if (user) {
//                                 res.status(200).json({
//                                     message: "Profile mis à jour avec succès",
//                                     user: updatedUser,
//                                 });
//                             } else {
//                                 res.status(403).json({ error: 'Etes-vous sûre d\'être sur votre compte?' })
//                             }
//                         })
//                         .catch((error) => {
//                             res.status(500).json({ error: 'Erreur interne' })});
//                     })
//                 } else {
//                     res.status(400).json({ error: 'Mauvaise requête' })
//                 }
//             })
//             .catch((error) => res.status(500).json({ error }));

//         } else {
//             const updatedUser = {
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 email: req.body.email,
//                 password: hash,
//                 profile: req.body.profile,
//                 isAdmin: 0,
//             };
//             models.User.update(updatedUser, { where: { id: req.body.id } })
//             .then(() => res.status(200).json({ message:
//                 "Profile sans image mis à jour avec succès",
//                 user: updatedUser,}))
//             .catch(error => res.status(401).json({ error }));
//         }

//     })
//     .catch(error => res.status(500).json({ error: 'Erreur interne' }));
// }

// exports.updateProfilPicture = async(req, res, next) => {
//                     //     const fileName = req.body.firstName + req.body.id + ".jpg"
//                     // const path = `${__dirname}/../../front/public/images/uploads/${fileName}`
//                     // const clientPath = ``

//                     // const fileName = user.imageUrl.split('/images/')[1];
//                     // fs.unlink(`images/${fileName}`, () => {
//                     //     const updatedUser = {
//                     //         firstName: req.body.firstName,
//                     //         lastName: req.body.lastName,
//                     //         email: req.body.email,
//                     //         profile: `${req.protocol}://${req.get('host')}/images/${
//                     //             req.file.filename
//                     //           }`,
//                     //         isAdmin: 0,
//                     //     };
//     try {
// 		if (req.file.detectedMimeType != "image/jpg"
//         && req.file.detectedMimeType != "image/png"
//         && req.file.detectedMimeType != "image/jpeg")
//         throw Error("invalid file");
// 		if (req.file.size > 500000) throw Error("max size");
// 	} catch (err) {
// 		res.status(201).json({ err });
// 	}

// 	const fileName = req.body.firstName + req.body.id + ".jpg";
// 	const path = `${__dirname}/../../front/public/images/uploads/${fileName}`;
// 	const clientPath = `./uploads/${fileName}`;

// 	await pipeline(req.file.stream, fs.createWriteStream(path));

// 	try {
// 		const sqlRequest = `UPDATE user SET user_picture = "${clientPath}" WHERE id = ${req.body.id}`;
// 		db.query(sqlRequest, (err, result) => {
// 			if (err) {
// 				res.status(500).json({ err });
// 			}
// 			res.status(200).json(clientPath);
// 		});
// 	} catch (err) {
// 		return res.status(500).send({ message: err });
// 	}
// }

// l'update qui marche avec postman
exports.updateUser = async(req, res, next) => {
// console.log(req.body.id)
    const userId = req.body.id;
    models.User.findByPk(req.body.id)
    .then((user) => {
        // console.log(user)
        if (userId === req.body.id) {
            const updatedUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            };
            // console.log(updatedUser)
            models.User.update(updatedUser, { where: { id: req.body.id } })
            .then((user) => {
                if (user) {
                    res.status(200).json({
                        message: "Profil mis à jour avec succès",
                        user: updatedUser,
                    });
                } else {
                    res.status(403).json({ error: 'Etes-vous sûre d\'être sur votre compte?' })
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Erreur interne 1' })});
        } else {
            res.status(400).json({ error: 'Mauvaise requête' })
        }
    })
}
// exports.updateUser = async(req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//         const userId = req.body.id;
//         models.User.findByPk(req.body.id)
//         .then((user) => {
//             if (user !== null && userId === req.body.id) {
//                 const updatedUser = {
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName,

//                 };
//                 models.User.update(updatedUser, { where: { id: req.body.id } })
//                 .then((user) => {
//                     if (user) {
//                         res.status(200).json({
//                             message: "Profil mis à jour avec succès",
//                             user: updatedUser,
//                         });
//                     } else {
//                         res.status(403).json({ error: 'Etes-vous sûre d\'être sur votre compte?' })
//                     }
//                 })
//                 .catch((error) => {
//                     res.status(500).json({ error: 'Erreur interne 1' })});
//             } else {
//                 res.status(400).json({ error: 'Mauvaise requête' })
//             }
//         })
//     })
//     .catch(error => res.status(500).json({ error: 'Erreur interne 2' }));
// }

exports.deleteUser = async(req, res, next) => {
    models.User.destroy({  where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Compte utilisateur supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};

// exemple pour l'image
exports.nanan = (req, res, next) => {
    // console.log(req.params.id)
    if (req.file) {
      models.User.findOne({ _id: req.params.id })
        .then((user) => {


          const fileName = user.imageUrl.split('/images/')[1];
          fs.unlink(`images/${fileName}`, () => {
            const userObject = {
              ...JSON.parse(req.body.user),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${
                req.file.filename
              }`,
            };
            models.User.update({ _id: req.params.id }, { ...userObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !'}))
            .catch(error => res.status(400).json({ error }));
          });
        })



        .catch((error) => res.status(500).json({ error }));
    } else {
      const userObject = { ...req.body };
      models.User.update({ _id: req.params.id }, { ...userObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(401).json({ error }));
    }
}
