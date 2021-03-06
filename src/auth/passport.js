const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport.use(new LocalStrategy(
    (username, password, done) => {
        UserModel.findOne({
            username: username
        }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: `Cannot find user with username "${username}"`
                });
            }

            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is incorrect'
                });
            }

            return done(null, user);
        });
    }
));