const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

// authentification
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);

// user crud
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', auth, multer, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;