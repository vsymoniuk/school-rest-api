const config = require('../config')
const User = require('../../models/User')

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env["JWT_KEY"] || config.jwt

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