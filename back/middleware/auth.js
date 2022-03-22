// create and verify TOKEN
const jwt = require('jsonwebtoken');
// const models = require('../models')

// protect selected routes by verifing user's authentification before authorization to send a request
// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt
//   if (token) {
//     jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
//       if (err) {
//         console.log(err)
//       } else {
//         let user = await models.User.findByPk(decodedToken.userId)
//         res.locals.user = user
//         console.log(decodedToken.userId);
//         next()
//       }
//     })
//   } else {
//     console.log('No token')
//   }
// };

// protect selected routes by verifing user's authentification before authorization to send a request
module.exports = (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(' ')[1];
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      console.log(decodedToken.userId);
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
