import React, { useState } from 'react';
import { Form, Button, ProgressBar, Alert } from 'react-bootstrap';
import { uploadAudio } from '../services/api';

const AudioUploader = ({ onTranscriptionComplete }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setError('File is too large. Maximum size is 10MB.');
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
            setError('');
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

        try {
            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append('audio', selectedFile);

            // Call the API service
            const response = await uploadAudio(formData);

            // Notify the parent component with the new transcription data
            if (onTranscriptionComplete) {
                onTranscriptionComplete(response.data.transcript);
            }

            // Reset the form
            setSelectedFile(null);
            document.getElementById('formFile').value = null; // Clear file input

        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed. Please try again.');
        } finally {
            // This block runs whether the upload succeeds or fails
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    return (
        <div>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Control 
                    type="file" 
                    onChange={handleFileChange} 
                    accept="audio/*" 
                    disabled={isUploading}
                />
            </Form.Group>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
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