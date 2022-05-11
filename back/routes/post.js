const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/likes');
const commentCtrl = require('../controllers/comment');

// crud post
router.get('/', auth, postCtrl.getAllPost);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

// post's like
router.get('/:id/like', auth, likeCtrl.likeCount);
router.post('/:id/like', auth, likeCtrl.like);

// crud post's comment
router.get('/:id/comment', auth, commentCtrl.getAllComment);
router.post('/:id/comment', auth, commentCtrl.createComment);
router.get('/:id/comment/:id', auth, commentCtrl.getOneComment);
router.put('/:id/comment/:id', auth, commentCtrl.modifyComment);
router.delete('/:id/comment/:id', auth, commentCtrl.deleteComment);

module.exports = router;