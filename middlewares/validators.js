const {body} = require('express-validator');

module.exports.register = [
    body('email')
        .trim()
        .not().isEmpty().withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address'),

    body('password')
        .trim()
        .isLength({min: 6}).withMessage('Password cannot be less than 6 characters'),
];

module.exports.login = [
    body('email')
        .trim()
        .not().isEmpty().withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address'),

    body('password')
        .trim()
        .isLength({min: 6}).withMessage('Password cannot be less than 6 characters'),
];