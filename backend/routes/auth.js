const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input first (Fail Fast)
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password.' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }

        // 2. Check if registration is open
        const userCount = await User.countDocuments();
        if (userCount >= 10) {
            return res.status(403).json({ message: 'User registration is temporarily closed. We have reached the maximum number of users.' });
        }

        // 3. Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        // 4. Create and save the new user
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully. You can now log in.' });

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT
 * @access  Public
 */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Server error during login.' });
        }
        if (!user) {
            return res.status(401).json({ message: info.message || 'Authentication failed.' });
        }

        // User is authenticated, create JWT
        const payload = {
            id: user.id,
            email: user.email
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token expires in 1 day
        );

        return res.json({
            success: true,
            token: `Bearer ${token}` // Standard practice to include Bearer prefix
        });

    })(req, res, next);
});

module.exports = router;
