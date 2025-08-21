import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { Button, Alert, Badge, Spinner } from 'react-bootstrap';
import { uploadAudio } from '../services/api';

const AudioRecorder = ({ onTranscriptionComplete, onTranscriptionError }) => {
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [error, setError] = useState('');

    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ 
        audio: true,
        blobPropertyBag: { type: 'audio/wav' }
    });

    const handleTranscribe = async () => {
        if (!mediaBlobUrl) {
            setError('No recording available to transcribe.');
            return;
        }
        setIsTranscribing(true);
        setError('');
        
        try {
            // 1. Fetch the blob data from the temporary URL
            const audioBlob = await fetch(mediaBlobUrl).then(res => res.blob());
            
            // 2. Create a File object from the blob
            const audioFile = new File([audioBlob], "recording.wav", { type: "audio/wav" });

            // 3. Use FormData to send the file
            const formData = new FormData();
            formData.append('audio', audioFile);

            // 4. Call the API service
            const response = await uploadAudio(formData);

            // 5. Notify the parent component
            if (onTranscriptionComplete) {
                onTranscriptionComplete(response.data.transcript);
            }

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Transcription failed. Please try again.';
            setError(errorMessage);
            if (onTranscriptionError) {
                onTranscriptionError(errorMessage);
            }
        } finally {
            setIsTranscribing(false);
        }
    };
    
    const handleClear = () => {
        window.location.reload();
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="mb-0">Status:</p>
                <Badge pill bg={status === 'recording' ? 'danger' : 'secondary'} className="fs-6">
                    {status}
                </Badge>
            </div>
            {mediaBlobUrl && (
                <div className="mb-3">
                    <audio src={mediaBlobUrl} controls className="w-100" />
                </div>
            )}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            <div className="d-grid gap-2 mt-3">
                {status !== 'recording' ? (
                    <Button variant="danger" onClick={startRecording} disabled={isTranscribing}>
                        Start Recording
                    </Button>
                ) : (
                    <Button variant="warning" onClick={stopRecording}>
                        Stop Recording
                    </Button>
                )}
                <Button 
                    variant="success" 
                    onClick={handleTranscribe}
                    disabled={!mediaBlobUrl || status === 'recording' || isTranscribing}
                >
                    {isTranscribing ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            {' '} Transcribing...
                        </>
                    ) : 'Transcribe Recording'}
                </Button>
                <Button 
                    variant="outline-secondary" 
                    onClick={handleClear} 
                    disabled={!mediaBlobUrl || status === 'recording' || isTranscribing}
                >
                    Clear Recording
                </Button>
            </div>
        </div>
    );
};

export default AudioRecorder;