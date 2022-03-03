const express = require('express');

const app = express();

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')

// no cors error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// request access req.body
app.use(express.json());

// routes
app.use('/api/auth', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

module.exports = app;