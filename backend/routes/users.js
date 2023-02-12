const express = require('express');
const {userValidation, changePasswordValidation} = require('../api/validation/user')
const validationError = require('../api/middleware/validationError');
const errorWrap = require('../utils/errorWrap')
const userController = require('../api/controller/user')
const checkAuth = require('../api/middleware/checkAuth')
const route = express.Router();

route.post('/',userValidation,validationError,errorWrap.wrapper(userController.createUser))

route.get('/',errorWrap.wrapper(userController.getUser))

route.get('/:id',errorWrap.wrapper(userController.getUserById))

route.put('/remove-users',errorWrap.wrapper(userController.removeUsers))

route.put('/activate-users',errorWrap.wrapper(userController.activateUsers))

route.put('/change-password',checkAuth,changePasswordValidation,validationError,errorWrap.wrapper(userController.changePassword))

module.exports = route;