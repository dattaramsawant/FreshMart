const express = require('express');
const router = express.Router();

const user = require('./users')
const auth = require('./auth')
const role = require('./roles')
const category = require('./categories')

router.use('/user',user);
router.use('/auth',auth);
router.use('/role',role);
router.use('/category',category);

module.exports = router;
