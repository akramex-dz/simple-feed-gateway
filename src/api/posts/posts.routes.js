const express = require('express');
const { isAuthenticated, setLoggedInUserIdFromToken } = require('../../middlewares');
const {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  getPostsByUserIds,
  createPost,
  updatePostById,
  deletePostById,
  likePost,
  unlikePost,
} = require('./posts.service');

const { listFollowingsIds } = require('../users/users.service');

const router = express.Router();

// Get all posts
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// Get post by ID
router.get('/:postId', isAuthenticated, async (req, res, next) => {
  try {
    const post = await getPostById(req.params.postId);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Get posts by user ID
router.get('/user/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const posts = await getPostsByUserId(req.params.userId);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// Get posts by user IDs
router.post('/users', isAuthenticated, async (req, res, next) => {
  try {
    const posts = await getPostsByUserIds(req.body.userIds);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// Get post of followings of logged in user
router.get('/followings', isAuthenticated, setLoggedInUserIdFromToken, async (req, res, next) => {
  try {
    const followingsIds = await listFollowingsIds(req.loggedInUserId);
    const posts = await getPostsByUserIds(followingsIds);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// Create a new post
router.post('/', isAuthenticated, setLoggedInUserIdFromToken, async (req, res, next) => {
  try {
    const newPost = {
      userId: req.loggedInUserId,
      content: req.body.content,
    };

    const post = await createPost(newPost);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Update post by ID
router.put('/:postId', isAuthenticated, setLoggedInUserIdFromToken, async (req, res, next) => {
  try {
    const oldPost = await getPostById(req.params.postId);
    if (oldPost.userId !== req.loggedInUserId) {
      res.status(403);
      throw new Error('Forbidden');
    }

    const newPost = {
      content: req.body.content,
    };
    const post = await updatePostById(req.params.postId, newPost);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Delete post by ID
router.delete('/:postId', isAuthenticated, setLoggedInUserIdFromToken, async (req, res, next) => {
  try {
    const postToDelete = await getPostById(req.params.postId);
    if (postToDelete.userId !== req.loggedInUserId) {
      res.status(403);
      throw new Error('Forbidden');
    }

    const post = await deletePostById(req.params.postId);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Like a post
router.post('/:postId/like', isAuthenticated, async (req, res, next) => {
  try {
    const post = await likePost(req.params.postId, req.body.userId);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Unlike a post
router.delete('/:postId/unlike/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const post = await unlikePost(req.params.postId, req.params.userId);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
