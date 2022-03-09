const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);
router.put('/:id', userCtrl.updateAccount);
router.delete('/:id', userCtrl.deleteAccount);

module.exports = router;