const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

router.post('/', PostController.createPost);
router.get('/', PostController.getAllPosts);
router.put('/:postId', PostController.updatePost);
router.delete('/:postId', PostController.deletePost);

module.exports = router;
