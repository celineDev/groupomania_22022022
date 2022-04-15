const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/likes');

router.get('/', postCtrl.getAllPost);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

router.get('/:id/like', likeCtrl.likeCount);
router.post('/:id/like', auth, likeCtrl.like);

module.exports = router;