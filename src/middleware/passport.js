const config = require('../config')
const User = require('../models/User')

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.jwt

module.exports = passport => {

    passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
        try {

            const user = await User.findById(jwt_payload.userId).select('id email')

            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }

        } catch (err) {
            console.log(err)
        }


    }))
}