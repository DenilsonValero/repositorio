// passport.js
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('./models/User');
const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.jwt]),
    secretOrKey: 'your_jwt_secret'  // Cambia esto por una clave secreta más segura
};

const jwtStrategy = new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
});

module.exports = {
    jwtStrategy
};
