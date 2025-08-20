import React from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';

const HistoryPage = () => {
    // We will replace this with real data later
    const isLoading = false;
    // Example of what transcripts might look like
    const transcripts = []; // An empty array to show the "no transcripts" message

    return (
        <Container>
            <h1 className="my-4">Transcription History</h1>
            {isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : transcripts.length === 0 ? (
                <Card>
                    <Card.Body className="text-center text-muted">
                        You don't have any transcripts yet. Go to the dashboard to create your first one!
                    </Card.Body>
                </Card>
            ) : (
                // This is where the list of transcripts will be rendered.
                // We will use .map() on the transcripts array here.
                <div>
                    <p>Transcript list will be here.</p>
                </div>
            )}
        </Container>
    );
};

export default HistoryPage;