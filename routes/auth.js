const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/auth');
const validator = require('../middlewares/validators');

require('../middlewares/passport');

const passportJWT = passport.authenticate('jwt', {session: false});

router.get('/', (req, res) => res.json({message: 'Home Page'}));

router.post('/register', validator.register, controller.register);

router.post('/login', validator.login, controller.login);

router.get('/logout', passportJWT, controller.logout);

module.exports = router;
