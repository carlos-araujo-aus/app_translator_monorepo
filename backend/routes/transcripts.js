const express = require('express');
const router = express.Router();
const passport = require('passport');

// JWT authentication middleware. We'll use it to protect the routes.
const requireAuth = passport.authenticate('jwt', { session: false });

// --- Route to upload and transcribe an audio file ---
// @route   POST /api/transcripts/upload
// @desc    Upload an audio file and get transcription
// @access  Private
router.post('/upload', requireAuth, (req, res) => {
    // The logic for uploading with multer and calling Deepgram will go here
    res.send('Endpoint to upload files. (Protected)');
});

// --- Route to get the user's transcript history ---
// @route   GET /api/transcripts
// @desc    Get all transcripts for the logged-in user
// @access  Private
router.get('/', requireAuth, (req, res) => {
    // The logic for searching in the database will go here
    res.send(`Transcript history for the user: ${req.user.email}. (Protected)`);
});

module.exports = router;
