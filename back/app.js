const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')

// no cors error
app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:4200', 'http://localhost:4200'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

// request access req.body
app.use(express.json());
app.use(cookieParser())

// routes
app.use('/api/auth', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

module.exports = app;