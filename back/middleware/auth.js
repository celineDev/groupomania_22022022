// create and verify TOKEN
const jwt = require('jsonwebtoken');

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
