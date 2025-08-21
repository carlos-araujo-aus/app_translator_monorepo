import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Import the new components
import AudioUploader from '../components/AudioUploader';
import AudioRecorder from '../components/AudioRecorder';

const DashboardPage = () => {
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
              <AudioUploader />
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
              <AudioRecorder />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
            <Card>
                <Card.Body>
                    <Card.Title>Last Transcription Result</Card.Title>
                    <div className="p-3 border rounded bg-light mt-2">
                        <p className="text-muted">Your transcription result will appear here...</p>
                    </div>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;