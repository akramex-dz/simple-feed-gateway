const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  findUserById,
  searchUsersByEmailOrUsername,
  followUser,
  unfollowUser,
  findUserByUsername,
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
router.put('/:username/follow', isAuthenticated, async (req, res, next) => {
  try {
    const { username } = req.params;
    const { userId: followerId } = req.payload;
    const user = await findUserByUsername(username);

    if (user.id === followerId) {
      res.status(400);
      throw new Error('You cannot follow yourself.');
    }

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
router.put('/:username/unfollow', isAuthenticated, async (req, res, next) => {
  try {
    const { username } = req.params;
    const { userId: followerId } = req.payload;
    const user = await findUserByUsername(username);

    if (user.id === followerId) {
      res.status(400);
      throw new Error('You cannot unfollow yourself.');
    }

    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }

    const { unfollowed } = await unfollowUser(followerId, user.id);
    res.json(unfollowed);
  } catch (err) {
    next(err);
  }
});

// list followers
router.get('/:username/followers', isAuthenticated, async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await findUserByUsername(username);
    const followers = await listFollowers(user.id);
    res.json(followers);
  } catch (err) {
    next(err);
  }
});

// list followings
router.get('/:username/followings', isAuthenticated, async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await findUserByUsername(username);
    const followings = await listFollowings(user.id);
    res.json(followings);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
