import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, ListGroup } from 'react-bootstrap';
import { getHistory } from '../services/api';

const HistoryPage = () => {
    const [transcripts, setTranscripts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // This function will be called when the component mounts
        const fetchHistory = async () => {
            try {
                setError('');
                setLoading(true);
                const response = await getHistory();
                setTranscripts(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch history.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []); 

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            );
        }

        if (error) {
            return <Alert variant="danger">{error}</Alert>;
        }

        if (transcripts.length === 0) {
            return (
                <Card>
                    <Card.Body className="text-center text-muted">
                        You don't have any transcripts yet. Go to the dashboard to create your first one!
                    </Card.Body>
                </Card>
            );
        }

        return (
            <div className="d-flex justify-content-center py-4">
              <div className="w-100" style={{ maxWidth: "800px" }}>
                <ListGroup>
                  {transcripts.map((transcript) => (
                    <ListGroup.Item key={transcript._id} className="mb-3 border rounded">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{transcript.originalFilename}</h5>
                        <small>{new Date(transcript.createdAt).toLocaleDateString()}</small>
                      </div>
                      <p className="mb-1">{transcript.transcribedText}</p>
                      <small className="text-muted">
                        Duration: {transcript.durationSeconds.toFixed(2)}s |{" "}
                        Confidence: {(transcript.confidence * 100).toFixed(1)}%
                      </small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </div>
        );
    };

    return (
        <Container>
            <h1 className="mb-4 fw-bold text-center">📂Transcription History</h1>
            {renderContent()}
        </Container>
    );
};

export default HistoryPage;