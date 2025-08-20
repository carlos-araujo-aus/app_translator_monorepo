const fs = require('fs');
const axios = require('axios');

const DEEPGRAM_API_URL = process.env.DEEPGRAM_API_URL;
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

const transcribeAudio = async (filePath) => {
    if (!DEEPGRAM_API_KEY || !DEEPGRAM_API_URL) {
        throw new Error('DEEPGRAM_API_KEY is not configured.');
    }

    try {
        const audioData = fs.readFileSync(filePath);

        const headers = {
            'Authorization': `Token ${DEEPGRAM_API_KEY}`,
            'Content-Type': 'audio/*',
            'Accept': 'application/json'
        };

        const params = {
            model: 'nova-2',
            punctuate: true,
            smart_format: true,
            detect_language: true,
            filler_words: true
        };
        
        const response = await axios.post(DEEPGRAM_API_URL, audioData, { params, headers });

        const result = response.data.results?.channels?.[0]?.alternatives?.[0];
        if (!result || !result.transcript) {
            throw new Error('No transcription result found in API response.');
        }

        return {
            text: result.transcript,
            confidence: result.confidence || 0,
            duration: response.data.metadata?.duration || 0
        };

    } catch (error) {
        console.error('Error calling Deepgram API:', error.response ? error.response.data : error.message);
        throw new Error('Failed to transcribe audio via Deepgram.');
    }
};

module.exports = { transcribeAudio };