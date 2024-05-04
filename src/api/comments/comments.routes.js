const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  getCommentsByUserId,
  getCommentsByPostId,
  getCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
  likeComment,
  unlikeComment,
} = require('./comments.service');

const router = express.Router();

// Get comments by user ID
router.get('/user/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const comments = await getCommentsByUserId(req.params.userId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

// Get comments by post ID
router.get('/post/:postId', isAuthenticated, async (req, res, next) => {
  try {
    const comments = await getCommentsByPostId(req.params.postId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

// Get comment by ID
router.get('/comment/:commentId', isAuthenticated, async (req, res, next) => {
  try {
    const comment = await getCommentById(req.params.commentId);
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

// Create a new comment
router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const { userId: loggedInUserId } = req.payload;

    const newComment = {
      postId: req.body.postId,
      userId: loggedInUserId,
      content: req.body.content,
    };

    const comment = await createComment(newComment);
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

// Update comment by ID
router.put('/:commentId', isAuthenticated, async (req, res, next) => {
  try {
    const { userId: loggedInUserId } = req.payload;

    const oldComment = await getCommentById(req.params.commentId);
    if (oldComment.userId !== loggedInUserId) {
      res.status(403);
      throw new Error('Forbidden');
    }

    const newComment = {
      content: req.body.content,
    };
    const comment = await updateCommentById(req.params.commentId, newComment);
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

// Delete comment by ID
router.delete('/:commentId', isAuthenticated, async (req, res, next) => {
  try {
    const { userId: loggedInUserId } = req.payload;

    const commentToDelete = await getCommentById(req.params.commentId);
    if (commentToDelete.userId !== loggedInUserId) {
      res.status(403);
      throw new Error('Forbidden');
    }

    const comment = await deleteCommentById(req.params.commentId);
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

// Like a comment
router.post('/:commentId/like', isAuthenticated, async (req, res, next) => {
  try {
    const { userId: loggedInUserId } = req.payload;

    const comment = await likeComment(req.params.commentId, loggedInUserId);
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

// Unlike a comment
router.delete('/:commentId/unlike', isAuthenticated, async (req, res, next) => {
  try {
    const { userId: loggedInUserId } = req.payload;

    const comment = await unlikeComment(req.params.commentId, loggedInUserId);
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
