const express=require('express')
const errorWrap = require('../utils/errorWrap')
const {authValidation} = require('../api/validation/auth')
const validationError = require('../api/middleware/validationError');
const authController = require('../api/controller/auth');
const requestLimiter = require('../api/middleware/requestLimiter');

const route = express.Router();

route.post('/login',authValidation,validationError,requestLimiter,errorWrap.wrapper(authController.login))

route.post('/refresh',errorWrap.wrapper(authController.refreshToken))

route.post('/logout',errorWrap.wrapper(authController.logout))

route.post('/test',errorWrap.wrapper(authController.forgotPassword))
module.exports = route;