const express = require('express');
const { isAuthenticated } = require('../../middlewares');
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
} = require('../Services/posts.service');

const { listFollowingsIds } = require('../Services/users.service');

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
router.get('/post/:postId', isAuthenticated, async (req, res, next) => {
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
router.get('/followings', isAuthenticated, async (req, res, next) => {
  try {
    const { userId: loggedInUserId } = req.payload;
    const followingsIds = await listFollowingsIds(loggedInUserId);
    console.log(followingsIds);
    const posts = await getPostsByUserIds(followingsIds);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// Create a new post
router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const { userId: loggedInUserId } = req.payload;

    const newPost = {
      userId: loggedInUserId,
      content: req.body.content,
    };

    const post = await createPost(newPost);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Update post by ID
router.put('/:postId', isAuthenticated, async (req, res, next) => {
  try {
    const { userId: loggedInUserId } = req.payload;

    const oldPost = await getPostById(req.params.postId);
    if (oldPost.userId !== loggedInUserId) {
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
router.delete('/:postId', isAuthenticated, async (req, res, next) => {
  try {
    const { userId: loggedInUserId } = req.payload;

    const postToDelete = await getPostById(req.params.postId);
    if (postToDelete.userId !== loggedInUserId) {
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
    const { userId: loggedInUserId } = req.payload;

    const post = await likePost(req.params.postId, loggedInUserId);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Unlike a post
router.delete('/:postId/unlike', isAuthenticated, async (req, res, next) => {
  try {
    const { userId: loggedInUserId } = req.payload;

    const post = await unlikePost(req.params.postId, loggedInUserId);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
