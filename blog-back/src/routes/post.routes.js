// -------- src/routes/post.routes.js --------
import express from 'express';
import {
  createPost,
  latestPosts,
  popularPosts,
  postsByCategory,
  getPost,
  myPosts,
  updatePost,
  deletePost,
  postsByAuthor,
  latestPostsPaginated
} from '../controllers/post.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// public
router.get('/latest', latestPosts);
router.get('/latest-paged', latestPostsPaginated);
router.get('/popular', popularPosts);
router.get('/category/:categoryId', postsByCategory);
router.get('/author/:userId', postsByAuthor);
router.get('/:id', getPost);

// protected
router.post('/', authMiddleware, createPost);
router.get('/me/myposts', authMiddleware, myPosts);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;