const fs = require('fs');
const path = require('path');
const axios = require('axios');

const url = "https://api.deepgram.com/v1/listen";

function findAudioFile() {
    const audioExtensions = ['.mp3', '.wav', '.m4a', '.ogg', '.flac', '.aac'];
    const files = fs.readdirSync('./');
    
    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (audioExtensions.includes(ext)) {
            console.log(`Found audio file: ${file}`);
            return file;
        }
    }
    
    throw new Error('No audio files found in current directory');
}

async function transcripAudio(audioFilePath, apiKey) {
    try {
        if (!fs.existsSync(audioFilePath)) {
            throw new Error('The audio file does not exist');
        }
        
        const audioData = fs.readFileSync(audioFilePath);

        const headers = {
            Accept: "application/json",
            Authorization: `Token ${apiKey}`,
            "Content-Type": "audio/*",
        };

        const queryParams = '?model=nova-2&punctuate=true&smart_format=true&detect_language=true&filler_words=true';
        
        const response = await axios.post(url + queryParams, audioData, {
            headers: headers,
            timeout: 60000,
        });

        const transcription = response.data.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';
        
        if (!transcription) {
            throw new Error('No transcription found in response');
        }

        const outputFilePath = path.join(
            path.dirname(audioFilePath), 
            `${path.basename(audioFilePath, path.extname(audioFilePath))}_transcription.txt`
        );

        fs.writeFileSync(outputFilePath, transcription, 'utf-8');
        console.log(`Transcription saved to ${outputFilePath}`);

        return transcription;

    } catch (error) {
        console.error('Error transcribing audio:', error.message);
        throw error;
    }
}

require('dotenv').config();
const apiKey = process.env.DEEPGRAM_API_KEY;

if (!apiKey) {
    console.error('Error: DEEPGRAM_API_KEY not found in environment variables');
    process.exit(1);
}

try {
    const audioPath = findAudioFile(); // ← Detecta automáticamente
    
    transcripAudio(audioPath, apiKey)
     .then(transcription => {
        console.log('Transcription completed successfully');
        console.log('Text:', transcription);
     })
     .catch(error => {
        console.error('Error:', error.message);
     });
} catch (error) {
    console.error('Error:', error.message);
}