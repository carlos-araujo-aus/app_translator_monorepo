import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { Button, Alert, Badge } from 'react-bootstrap';

const AudioRecorder = () => {
    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        clearBlob,
    } = useReactMediaRecorder({ 
        audio: true,
        blobPropertyBag: { type: 'audio/wav' } // Specify the format
    });

    const handleTranscribe = async () => {
        if (!mediaBlobUrl) return;

        console.log("Transcribing recorded audio:", mediaBlobUrl);
        // --- API call logic will go here ---
        // We will fetch the blob, create a File object, and send it.
        
        // For now, let's just clear the blob
        clearBlob();
        alert("Transcription logic to be implemented!");
    };
    
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="mb-0">Status:</p>
                <Badge 
                    pill 
                    bg={status === 'recording' ? 'danger' : 'secondary'}
                    className="fs-6"
                >
                    {status}
                </Badge>
            </div>

            {mediaBlobUrl && (
                <div className="mb-3">
                    <audio src={mediaBlobUrl} controls className="w-100" />
                </div>
            )}
            
            <div className="d-grid gap-2">
                {status !== 'recording' ? (
                    <Button variant="danger" onClick={startRecording}>
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
                    disabled={!mediaBlobUrl || status === 'recording'}
                >
                    Transcribe Recording
                </Button>

                <Button 
                    variant="outline-secondary" 
                    onClick={clearBlob}
                    disabled={!mediaBlobUrl || status === 'recording'}
                >
                    Clear Recording
                </Button>
            </div>
        </div>
    );
};

export default AudioRecorder;