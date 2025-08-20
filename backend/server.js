// 1. Imports
require('dotenv').config(); // load the environment variables from .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// 2. Initialize the App
const app = express();
const PORT = process.env.PORT || 3001;

// 3. Middlewares
app.use(cors()); // Allow requests from other origins (our frontend)
app.use(express.json()); // Allow the server to understand JSON
app.use(express.urlencoded({ extended: true })); // Allow the server to understand form data

// 4. Connect to the Database
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('FATAL ERROR: MONGO_URI is not defined.');
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => console.log('✅ MongoDB connected successfully.'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// 5. Routes (we'll add them later)
app.get('/', (req, res) => {
    res.send('Welcome to the Transcription API Backend!');
});

// 6. Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
