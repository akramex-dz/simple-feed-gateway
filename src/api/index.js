const express = require('express');

const router = express.Router();

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');

router.use('/auth', auth);
router.use('/users', users);

module.exports = router;
