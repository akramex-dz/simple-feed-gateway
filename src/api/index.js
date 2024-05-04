const express = require('express');

const router = express.Router();

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const posts = require('./posts/posts.routes');
// const comments = require('./comments/comments.routes');

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);
// router.use('/comments', comments);

module.exports = router;
