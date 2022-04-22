const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/likes');
const commentCtrl = require('../controllers/comment');

// crud post
router.get('/', postCtrl.getAllPost);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

// post's like
router.get('/:id/like', likeCtrl.likeCount);
router.post('/:id/like', auth, likeCtrl.like);

// crud post's comment
router.get('/:id/comment', commentCtrl.getAllComment);
router.post('/:id/comment', auth, commentCtrl.createComment);
router.get('/:id/comment/:id', commentCtrl.getOneComment);
router.put('/:id/comment/:id', auth, commentCtrl.modifyComment);
router.delete('/:id/comment/:id', commentCtrl.deleteComment);
// get number of comment
router.get('/:id/count-comment', commentCtrl.nbrOfComment);

module.exports = router;