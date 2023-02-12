const express = require('express');
const { createRole, getRoles } = require('../api/controller/role');
const checkAuth = require('../api/middleware/checkAuth');
const validationError = require('../api/middleware/validationError');
const errorWrap = require('../utils/errorWrap')
const route = express.Router();

route.get('/',errorWrap.wrapper(getRoles))

route.post('/',checkAuth,errorWrap.wrapper(createRole))

module.exports = route;