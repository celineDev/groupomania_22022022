const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// auth
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);

// user
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;