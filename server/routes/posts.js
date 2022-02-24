import express from 'express';

import auth from '../middleware/auth.js';
import { getPost, getPosts, createPost, updatePost, deletePost , likePost, getPostsBySearch, commentPost, getPostsByCreator, dislikePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/profile', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.patch('/:id/dislikePost',auth,dislikePost);
router.post('/:id/commentPost', auth, commentPost);

export default router;