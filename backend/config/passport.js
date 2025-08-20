const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User');

// Options for the JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

// 1. JWT Strategy: To verify tokens in protected requests
passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        // The 'payload' is the decoded JWT object (contains the user ID)
        const user = await User.findById(payload.id);

        if (user) {
            // If the user is found, pass it to the next middleware
            return done(null, user);
        } else {
            // If the user is not found
            return done(null, false);
        }
    } catch (error) {
        console.error('Error in JWT Strategy:', error);
        return done(error, false);
    }
}));

// 2. Local Strategy: To handle login with email and password
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        // Search for the user by their email
        const user = await User.findOne({ email: email }).select('+password');

        if (!user) {
            // If the user does not exist
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        // Compare the entered password with the one in the database
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            // If the password does not match
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        // If everything is correct, return the user
        return done(null, user);

    } catch (error) {
        console.error('Error in Local Strategy:', error);
        return done(error);
    }
}));

module.exports = passport;