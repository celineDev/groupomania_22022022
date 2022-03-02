const express = require('express');


const app = express();



// request access req.body
app.use(express.json());


module.exports = app;