const { body } = require("express-validator");

exports.userValidation = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name field is required.'),
        
    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name field is required.'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email field is required.')
        .isEmail()
        .withMessage('Email is not valid'),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password field is required.')
        .isLength({min: 8})
        .withMessage("Password should be 8 character long.")
]

exports.changePasswordValidation=[
    body('currentPassword')
        .trim()
        .notEmpty()
        .withMessage('Current Password field is required.'),
        
    body('newPassword')
        .trim()
        .notEmpty()
        .withMessage('New Password field is required.')
        .isLength({min: 8})
        .withMessage("New Password should be 8 character long."),
        
    body('confirmPassword')
        .trim()
        .notEmpty()
        .withMessage('Confirm Password field is required.')
]