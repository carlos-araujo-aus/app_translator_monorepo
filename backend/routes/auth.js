const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

// --- Register Route ---
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate the input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password.' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }

        // 2. Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // 3. Create the new user (the password is hashed automatically by the middleware in the model)
        const newUser = new User({
            email: email,
            password: password
        });

        await newUser.save();

        res.status(201).json({ 
            message: 'User registered successfully. You can now log in.'
        });

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// --- Login Route ---
// @route   POST /api/auth/login
// @desc    Login user and return JWT token
// @access  Public
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred during login.' });
        }
        if (!user) {
            // If the user is not found or the password is incorrect
            return res.status(401).json({ message: info.message || 'Authentication failed.' });
        }

        // If the authentication is successful, the user is in the 'user' variable
        // Now we create the JWT token
        const payload = {
            id: user.id,
            email: user.email
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // The token expires in 1 day
        );

        return res.json({
            success: true,
            token: `Bearer ${token}`
        });
    })(req, res, next);
});

module.exports = router;
