const config = require('config');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const User = require('../models/User');

const errorHandler = require('../utils/errorHandler');

signToken = (user) => {
    return jwt.sign({
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, config.get('jwtSecret'));
}

module.exports = {
    register: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()[0].msg});
        }

        const {email, password} = req.body;

        try {
            const candidate = await User.findOne({email});

            if (candidate) {
                return res.status(409).json({message: 'User exists, please login'});
            }

            const user = new User({email, password});

            await user.save();

            res.status(201).json({message: 'User created'});
        } catch (e) {
            errorHandler(res, e);
        }
    },

    login: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()[0].msg});
        }

        const {email, password} = req.body;

        try {
            const user = await User.findOne({email});

            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }

            const isMatch = await user.validPassword(password);

            if (!isMatch) {
                return res.status(401).json({message: 'Invalid password'});
            }

            const token = signToken(user);

            res.status(200).json({
                token: `Bearer ${token}`,
                userId: user.id
            });
        } catch (e) {
            errorHandler(res, e);
        }
    },

    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    }
}
