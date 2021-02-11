const config = require('config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

module.exports = (passport) => {
    passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('jwtSecret')
        }, async (payload, done) => {
            try {
                const user = await User.findById(payload.sub, {password: 0});

                if (user) {
                    return done(null, user);
                } else {
                    done(null, false);
                }
            } catch (err) {
                done(err, false);
            }
        })
    );
}
