import React, { useState, useEffect, useRef } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { Button, Alert, Badge, Spinner } from 'react-bootstrap';
import { uploadAudio } from '../services/api';

const AudioRecorder = ({ onTranscriptionComplete, onTranscriptionError }) => {
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [error, setError] = useState('');
    // NEW: State to hold the countdown value
    const [countdown, setCountdown] = useState(15);

    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ 
        audio: true,
        blobPropertyBag: { type: 'audio/wav' }
    });

    const intervalRef = useRef(null); // Ref to hold the interval ID

    // This effect will manage the countdown timer
    useEffect(() => {
        // Only run the timer if the status is 'recording'
        if (status === 'recording') {
            // Start a new interval
            intervalRef.current = setInterval(() => {
                setCountdown(prevCountdown => {
                    if (prevCountdown <= 1) {
                        // When countdown reaches 0, stop recording and clear the interval
                        clearInterval(intervalRef.current);
                        stopRecording();
                        return 0;
                    }
                    return prevCountdown - 1;
                });
            }, 1000); // Run every second
        } else {
            // If status is not 'recording', clear any existing interval and reset countdown
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setCountdown(15); // Reset for the next recording
        }

        // This is a cleanup function that runs when the component unmounts or the effect re-runs
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [status, stopRecording]); // The effect depends on 'status' and 'stopRecording'

    const handleTranscribe = async () => {
        if (!mediaBlobUrl) {
            setError('No recording available to transcribe.');
            return;
        }
        setIsTranscribing(true);
        setError('');
        
        try {
            const audioBlob = await fetch(mediaBlobUrl).then(res => res.blob());
            const audioFile = new File([audioBlob], "recording.wav", { type: "audio/wav" });
            const formData = new FormData();
            formData.append('audio', audioFile);
            const response = await uploadAudio(formData);

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
            <Alert variant="info">
                Audio recordings have a maximum duration of 15 seconds.
            </Alert>

            <div className="d-flex justify-content-between align-items-center my-3">
                <p className="mb-0">Status:</p>
                <div>
                    {/* NEW: Display the countdown timer when recording */}
                    {status === 'recording' && (
                        <span className="me-2 fw-bold text-danger">{countdown}s</span>
                    )}
                    <Badge pill bg={status === 'recording' ? 'danger' : 'secondary'} className="fs-6">
                        {status}
                    </Badge>
                </div>
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