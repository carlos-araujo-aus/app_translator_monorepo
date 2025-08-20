const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Import our models and services
const Transcript = require('../models/Transcript');
const { transcribeAudio } = require('../services/transcriptionService');

// JWT authentication middleware
const requireAuth = passport.authenticate('jwt', { session: false });

// Multer configuration for temporary file storage
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Create a unique filename to avoid collisions
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limit of 10MB for the file
});


// --- Route to upload and transcribe an audio file ---
// @route   POST /api/transcripts/upload
// @desc    Upload an audio file, get transcription, and save to DB
// @access  Private
router.post('/upload', requireAuth, upload.single('audio'), async (req, res) => {
    
    if (!req.file) {
        return res.status(400).json({ message: 'No audio file was uploaded.' });
    }

    try {
        console.log(`File received: ${req.file.path}. Initiating transcription...`);
        
        // 1. Call our transcription service
        const transcriptionResult = await transcribeAudio(req.file.path);

        console.log('Transcription successful. Saving to database...');

        // 2. Create a new transcription document in the DB
        const newTranscript = new Transcript({
            userId: req.user.id, // ID of the authenticated user (thanks to Passport)
            originalFilename: req.file.originalname,
            transcribedText: transcriptionResult.text,
            durationSeconds: transcriptionResult.duration,
            confidence: transcriptionResult.confidence
        });

        await newTranscript.save();
        
        console.log('Successfully saved to database.');

        // 3. (Optional but recommended) Delete the temporary file
        fs.unlinkSync(req.file.path);

        // 4. Return the result to the client
        res.status(201).json({
            message: 'File transcribed and saved successfully.',
            transcript: newTranscript
        });

    } catch (error) {
        console.error('Error in upload route:', error.message);
        
        // Make sure to delete the temporary file even if there's an error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ message: 'An error occurred during transcription process.' });
    }
});


// --- Route to get the history (we'll implement it in the next step) ---
router.get('/', requireAuth, (req, res) => {
    res.send(`Transcript history for the user: ${req.user.email}. (Protected)`);
});

module.exports = router;
