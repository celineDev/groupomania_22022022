const express = require('express');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

const app = express();

const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')

// database connection
try {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'groupomania',
    password: 'secret'
  });
  console.log('Connexion à Mysql réussie !');
} catch {
  console.error('Connexion à MongoDB échouée !');
}

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

module.exports = app;