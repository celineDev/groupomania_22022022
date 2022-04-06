const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPost);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

router.get('/:id/like', auth, postCtrl.likeCount);
router.post('/:id/usersLiked', auth, postCtrl.usersLiked);
router.post('/:id/like', auth, postCtrl.like);

module.exports = router;