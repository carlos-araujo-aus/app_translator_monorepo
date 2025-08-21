import React, { useState } from 'react';
import { Form, Button, ProgressBar, Alert } from 'react-bootstrap';

const AudioUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // You can add file type/size validation here if needed
            setSelectedFile(file);
            setError('');
            setSuccessMessage('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first.');
            return;
        }
        // Reset state
        setIsUploading(true);
        setError('');
        setSuccessMessage('');

        // --- API call logic will go here ---
        // Simulating an upload for now
        console.log("Uploading file:", selectedFile.name);
        // Simulate progress
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    setSuccessMessage(`File "${selectedFile.name}" transcribed successfully!`);
                    setSelectedFile(null); 
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    return (
        <div>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select Audio File</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} accept="audio/*" />
            </Form.Group>

            {isUploading && (
                <ProgressBar 
                    animated 
                    now={uploadProgress} 
                    label={`${uploadProgress}%`} 
                    className="mb-3"
                />
            )}
            
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            
            <div className="d-grid">
                <Button 
                    variant="primary" 
                    onClick={handleUpload} 
                    disabled={!selectedFile || isUploading}
                >
                    {isUploading ? 'Uploading...' : 'Upload and Transcribe'}
                </Button>
            </div>
        </div>
    );
};

export default AudioUploader;