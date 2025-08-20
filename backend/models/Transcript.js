const mongoose = require('mongoose');

const TranscriptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // This creates a reference to the User model
    },
    originalFilename: {
        type: String,
        required: true
    },
    transcribedText: {
        type: String,
        required: true
    },
    durationSeconds: {
        type: Number,
        required: true
    },
    confidence: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Transcript = mongoose.model('Transcript', TranscriptSchema);

module.exports = Transcript;