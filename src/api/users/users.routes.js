const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { findUserById, searchUsersByEmailOrUsername } = require('./users.services');

const router = express.Router();

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

module.exports = router;
