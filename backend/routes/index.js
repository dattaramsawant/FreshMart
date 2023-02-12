const express = require('express');
const router = express.Router();

const user = require('./users')
const auth = require('./auth')
const role = require('./roles')

router.use('/user',user);
router.use('/auth',auth);
router.use('/role',role);

module.exports = router;
