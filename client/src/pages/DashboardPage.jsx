import React, { useState } from 'react';
import { Row, Col, Card, Alert } from 'react-bootstrap';
import AudioUploader from '../components/AudioUploader';
import AudioRecorder from '../components/AudioRecorder';

const DashboardPage = () => {
    const [transcriptionResult, setTranscriptionResult] = useState(null);
    const [error, setError] = useState('');

    const handleTranscriptionComplete = (transcript) => {
        console.log("New transcription received in Dashboard:", transcript);
        setTranscriptionResult(transcript);
        setError(''); // Clear previous errors on new success
    };

    const handleTranscriptionError = (errorMessage) => {
        setError(errorMessage);
        setTranscriptionResult(null); // Clear previous results on new error
    };

    const renderTranscriptionResult = () => {
        if (!transcriptionResult) return null;

        return (
            <Alert variant="success" onClose={() => setTranscriptionResult(null)} dismissible className="mb-4">
                <Alert.Heading>Transcription Successful!</Alert.Heading>
                <p><strong>Original File:</strong> {transcriptionResult.originalFilename}</p>
                <hr />
                <p className="mb-0">{transcriptionResult.transcribedText}</p>
            </Alert>
        );
    };

    return (
        // A single Row to center a single content Column, with vertical margin (my-4)
        <Row className="justify-content-center my-4">
          <h2 className="mb-4 fw-bold text-center">🎙️ Transcribe Your Audio</h2>
            {/* This Column wraps ALL content, constraining its width and centering it */}
            <Col lg={11} xl={10}>
                {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
                {renderTranscriptionResult()}

                {/* This nested Row organizes the cards within the centered column */}
                <Row className="g-4">
                    {/* md={6} ensures the cards are side-by-side on medium screens (tablets) and larger */}
                    <Col md={6}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="mb-3">Upload Existing Audio File</Card.Title>
                                <AudioUploader 
                                    onTranscriptionComplete={handleTranscriptionComplete} 
                                    onTranscriptionError={handleTranscriptionError}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="mb-3">Record Audio</Card.Title>
                                <AudioRecorder 
                                    onTranscriptionComplete={handleTranscriptionComplete} 
                                    onTranscriptionError={handleTranscriptionError}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default DashboardPage;