const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  findUserById,
  searchUsersByEmailOrUsername,
  followUser,
  unfollowUser,
  listFollowers,
  listFollowings,
} = require('./users.services');

const router = express.Router();

// Get user profile
router.get('/profile', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Search users by email or username
router.get('/search', isAuthenticated, async (req, res, next) => {
  try {
    const { query } = req.query;
    const users = await searchUsersByEmailOrUsername(query);
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Follow a user
router.put('/:userId/follow', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { userId: followerId } = req.payload;

    if (userId === followerId) {
      res.status(400);
      throw new Error('You cannot follow yourself.');
    }

    const user = await findUserById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    const { followed } = await followUser(followerId, user.id);
    res.json(followed);
  } catch (err) {
    next(err);
  }
});

// Unfollow a user
router.put('/:userId/unfollow', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { userId: followerId } = req.payload;

    if (userId === followerId) {
      res.status(400);
      throw new Error('You cannot unfollow yourself.');
    }

    const user = await findUserById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    const { unfollowed } = await unfollowUser(followerId, userId);
    res.json(unfollowed);
  } catch (err) {
    next(err);
  }
});

// list followers
router.get('/followers', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    const followers = await listFollowers(user.id);
    res.json(followers);
  } catch (err) {
    next(err);
  }
});

// list followings
router.get('/followings', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    const followings = await listFollowings(user.id);
    res.json(followings);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
