const express = require('express');

const router = express.Router();

const auth = require('./Controllers/auth.controller');
const users = require('./Controllers/users.controller');
const posts = require('./Controllers/posts.controller');
const comments = require('./Controllers/comments.controller');

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);

module.exports = router;
