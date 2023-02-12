const { body } = require("express-validator");

exports.authValidation = [
    body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Email is not valid'),
        
    body('password')
        .notEmpty()
        .withMessage('Password field is required.')
]