// -------- src/controllers/post.controller.js --------
import Post from '../models/post.model.js';


// Create post (logged-in user)
export const createPost = async (req, res) => {
const { title, content, category } = req.body;


const post = await Post.create({
title,
content,
category,
author: req.user.id
});


res.status(201).json(post);
};

// Latest posts (public)
export const latestPosts = async (req, res) => {
const posts = await Post.find()
.populate('author', 'username bio')
.populate('category', 'name')
.sort({ createdAt: -1 })
.limit(10);


res.json(posts);
};


// Popular posts by view count (public)
export const popularPosts = async (req, res) => {
const posts = await Post.find()
.populate('author', 'username')
.populate('category', 'name')
.sort({ views: -1 })
.limit(10);


res.json(posts);
};


// Posts by category (public)
export const postsByCategory = async (req, res) => {
const posts = await Post.find({ category: req.params.categoryId })
.populate('author', 'username')
.populate('category', 'name');


res.json(posts);
};


// Single post + increment view count
export const getPost = async (req, res) => {
const post = await Post.findById(req.params.id)
.populate('author', 'username bio')
.populate('category', 'name');


if (!post) return res.status(404).json({ message: 'Post not found' });


post.views += 1;
await post.save();


res.json(post);
};


// User dashboard posts
export const myPosts = async (req, res) => {
const posts = await Post.find({ author: req.user.id })
.populate('category', 'name')
.sort({ createdAt: -1 });


res.json(posts);
};

// Phase 3 add here

// Update post (owner only)
export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not allowed' });
  }

  const { title, content, category } = req.body;
  post.title = title ?? post.title;
  post.content = content ?? post.content;
  post.category = category ?? post.category;

  await post.save();
  res.json(post);
};

// Delete post (owner only)
export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not allowed' });
  }

  await post.deleteOne();
  res.json({ message: 'Post deleted' });
};

// Public: posts by author (profile page)
export const postsByAuthor = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const posts = await Post.find({ author: req.params.userId })
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(posts);
};

// Public: latest posts with pagination
export const latestPostsPaginated = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const posts = await Post.find()
    .populate('author', 'username')
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(posts);
};

