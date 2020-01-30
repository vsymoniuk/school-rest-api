const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const config = require('../config');
const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async(jwtPayload, done) => {
        try {
            const user = await User.findById(jwtPayload.userId).select('id email');

            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (err) {
            console.log(err);
        }
    }));
};