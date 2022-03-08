const bcrypt = require('bcrypt');
// create and verify token
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const db = require('../config/db_connection')

// http://localhost:3000/api/auth/signup
// {
//     "fist_name": "John",
//     "last_name": "Doe",
//     "email": "johndoe@oc.fr",
//     "password": "secret"
// }

exports.signup = (req, res, next) => {
};

exports.login = async(req, res, next) => {
};