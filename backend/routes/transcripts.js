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
    limits: { fileSize: 5 * 1024 * 1024 } // Limit of 5MB for the file
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
        // --- NEW: Check user's transcript count ---
        const userId = req.user.id;
        const transcriptCount = await Transcript.countDocuments({ userId: userId });

        if (transcriptCount >= 5) {
            // If limit is reached, delete the temporary file and return an error
            fs.unlinkSync(req.file.path); 
            return res.status(403).json({ message: 'You have reached the maximum limit of 5 transcriptions.' });
        }
        // --- END OF NEW LOGIC ---

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


// --- Route to get the user's transcript history ---
// @route   GET /api/transcripts
// @desc    Get all transcripts for the logged-in user, sorted by most recent
// @access  Private
router.get('/', requireAuth, async (req, res) => {
    try {
        // 1. Get the user ID from the JWT token
        // Passport attaches the 'user' object to the request after authentication
        const userId = req.user.id;

        // 2. Search in the database
        // Find all documents in the 'Transcript' collection
        // where the 'userId' field matches the current user's ID.
        const transcripts = await Transcript.find({ userId: userId })
                                            .sort({ createdAt: -1 }); // Sort by creation date in descending order

        // 3. Return the results
        res.status(200).json(transcripts);

    } catch (error) {
        console.error('Error fetching transcript history:', error.message);
        res.status(500).json({ message: 'Server error while fetching history.' });
    }
});

module.exports = router;
