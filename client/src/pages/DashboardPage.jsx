import React, { useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';

import AudioUploader from '../components/AudioUploader';
import AudioRecorder from '../components/AudioRecorder';

const DashboardPage = () => {
  // State to hold the latest transcription result
  const [transcriptionResult, setTranscriptionResult] = useState(null);
  const [error, setError] = useState('');

  // This function will be passed down to the child components
  const handleTranscriptionComplete = (transcript) => {
      console.log("New transcription received in Dashboard:", transcript);
      setTranscriptionResult(transcript);
      setError(''); // Clear previous errors
  };

  // This function will be passed down to handle errors from children
  const handleTranscriptionError = (errorMessage) => {
      setError(errorMessage);
      setTranscriptionResult(null); // Clear previous results
  };

  return (
    <Container>
      <h1 className="my-4">Dashboard</h1>
      <p>Welcome! Upload an existing audio file or record a new one to get started.</p>
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Upload Audio File</Card.Title>
              <Card.Text className="mb-3">
                Select an audio file from your device (.mp3, .wav, .m4a, etc.).
              </Card.Text>
              <AudioUploader 
                onTranscriptionComplete={handleTranscriptionComplete}
                onTranscriptionError={handleTranscriptionError} // Pass error handler
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Record Audio</Card.Title>
               <Card.Text className="mb-3">
                Record a short audio clip directly from your microphone.
              </Card.Text>
              {/* We will connect this component next */}
              <AudioRecorder 
                onTranscriptionComplete={handleTranscriptionComplete}
                onTranscriptionError={handleTranscriptionError} // Pass error handler
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
            <Card>
                <Card.Body>
                    <Card.Title>Last Transcription Result</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="p-3 border rounded bg-light mt-2" style={{ minHeight: '100px' }}>
                        {transcriptionResult ? (
                            <p><strong>{transcriptionResult.originalFilename}:</strong> {transcriptionResult.transcribedText}</p>
                        ) : (
                            <p className="text-muted">Your transcription result will appear here...</p>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;