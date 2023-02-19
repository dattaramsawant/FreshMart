const { body } = require("express-validator");

exports.authValidation = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Email is not valid'),
        
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password field is required.')
]