const { body } = require("express-validator");

exports.userValidation = [
    body('firstName')
        .notEmpty()
        .withMessage('First name field is required.'),
        
    body('lastName')
        .notEmpty()
        .withMessage('Last name field is required.'),

    body('email')
        .notEmpty()
        .withMessage('Email field is required.')
        .isEmail()
        .withMessage('Email is not valid'),

    body('password')
        .notEmpty()
        .withMessage('Password field is required.')
        .isLength({min: 8})
        .withMessage("Password should be 8 character long.")
]

exports.changePasswordValidation=[
    body('currentPassword')
        .notEmpty()
        .withMessage('Current Password field is required.'),
        
    body('newPassword')
        .notEmpty()
        .withMessage('New Password field is required.')
        .isLength({min: 8})
        .withMessage("New Password should be 8 character long."),
        
    body('confirmPassword')
        .notEmpty()
        .withMessage('Confirm Password field is required.')
]