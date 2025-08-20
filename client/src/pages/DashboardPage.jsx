import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// We will create these components later
// import AudioUploader from '../components/AudioUploader';
// import AudioRecorder from '../components/AudioRecorder';

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
              <Card.Text>
                Select an audio file from your device (.mp3, .wav, .m4a, etc.).
              </Card.Text>
              {/* Placeholder for AudioUploader component */}
              <div className="p-3 border rounded bg-light">AudioUploader Component Placeholder</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Record Audio</Card.Title>
              <Card.Text>
                Record a short audio clip (max 15 seconds) directly from your microphone.
              </Card.Text>
              {/* Placeholder for AudioRecorder component */}
              <div className="p-3 border rounded bg-light">AudioRecorder Component Placeholder</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
            <Card>
                <Card.Body>
                    <Card.Title>Last Transcription Result</Card.Title>
                    {/* Placeholder for result display */}
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
